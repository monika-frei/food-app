const mongoose = require("mongoose");
const Recipe = require("../models/recipe");
const Img = require("../models/img");
const fs = require("fs");

exports.recipes_get_all_recipes = (req, res, next) => {
  Recipe.find()
    .select("-__v")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        recipes: docs.map((doc) => {
          return {
            _id: doc._id,
            category: doc.category,
            title: doc.title,
            ingredients: doc.ingredients,
            preparation: doc.preparation,
            time: doc.time,
            servings: doc.servings,
            info: doc.info,
            recipeImage: doc.recipeImage,
            request: {
              type: "GET",
              url: `https://fodd-app-server.herokuapp.com/recipes/${doc._id}`,
            },
            userId: doc.userId,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

exports.recipes_create_recipe = (req, res, next) => {
  const newImg = new Img();
  newImg.img.data = fs.readFileSync(req.file.path);
  newImg.img.contentType = "image/jpeg";
  newImg.save();
  let recipe;
  try {
    const doc = JSON.parse(req.body.document);
    recipe = new Recipe({
      _id: new mongoose.Types.ObjectId(),
      category: doc.category,
      title: doc.title,
      ingredients: doc.ingredients,
      preparation: doc.preparation,
      time: doc.time,
      servings: doc.servings,
      info: doc.info,
      recipeImage: newImg,
      userId: req.userData.userId,
    });
  } catch (error) {
    console.log(error);
  }
  recipe
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created recipe successfuly",
        createdRecipe: {
          _id: result._id,
          category: result.category,
          title: result.title,
          ingredients: result.ingredients,
          preparation: result.preparation,
          time: result.time,
          servings: result.servings,
          info: result.info,
          recipeImage: result.recipeImage,
          request: {
            type: "GET",
            url: `https://fodd-app-server.herokuapp.com/recipes/${result._id}`,
          },
          userId: result.userId,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error, requ: req.body });
    });
};

exports.recipes_get_single_recipe = (req, res, next) => {
  const id = req.params.recipeId;
  Recipe.findById(id)
    .select("-__v")
    .exec()
    .then((doc) => {
      if (doc) {
        res.send(doc);
      } else {
        res.status(404).json({ message: "No valid ID" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.recipes_change_recipe = (req, res, next) => {
  // można tutaj zmienić na : --> const updateOpt = {}; for(const opt of re.body){updateOpt[opt.propName]:opt.value} <-- i w set podmienić na obiekt updateOpt (założenie, że req.body jest tablicą)
  const id = req.params.recipeId;
  let recipe;
  try {
    const doc = JSON.parse(req.body.document);
    recipe = {
      category: doc.category,
      title: doc.title,
      ingredients: doc.ingredients,
      preparation: doc.preparation,
      time: doc.time,
      servings: doc.servings,
      info: doc.info,
      recipeImage: req.file.path,
      userId: req.userData.userId,
    };
  } catch (error) {
    console.log(error);
  }

  Recipe.update(
    { _id: id },
    {
      $set: recipe,
    },
    { userId: req.userData.userId }
  )
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Recipe updated",
        request: {
          type: "GET",
          url: `https://fodd-app-server.herokuapp.com/recipes/${id}`,
        },
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.recipes_delete_recipe = (req, res, next) => {
  const id = req.params.recepieId;
  Recipe.remove({ _id: id })
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Recipe deleted",
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
