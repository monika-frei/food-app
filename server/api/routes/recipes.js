const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const RecipeController = require("../controllers/recipes");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.get("/", checkAuth, RecipeController.recipes_get_all_recipes);

router.post(
  "/",
  checkAuth,
  upload.single("file"),
  RecipeController.recipes_create_recipe
);

router.get("/:recipeId", checkAuth, RecipeController.recipes_get_single_recipe);

router.patch(
  "/:recipeId",
  checkAuth,
  upload.single("file"),
  RecipeController.recipes_change_recipe
);

router.delete("/:recipeId", RecipeController.recipes_delete_recipe);

module.exports = router;
