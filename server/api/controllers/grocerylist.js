const mongoose = require("mongoose");
const GroceryList = require("../models/grocerylist");

exports.grocerylist_get_all = (req, res, next) => {
  Recipe.find()
    .select("-__v")
    .exec()
    .then((docs) => {
      const response = {
        lists: docs.map((doc) => {
          return {
            _id: doc._id,
            grocerylist: doc.grocerylist,
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

exports.grocerylist_post = (req, res, next) => {
  groceryList = new GroceryList({
    _id: new mongoose.Types.ObjectId(),
    grocerylist: req.body.grocerylist,
    userId: req.userData.userId,
  });
  groceryList
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Grocery list saved successfuly",
        createdGroceryList: {
          _id: result._id,
          grocerylist: result.grocerylist,
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
