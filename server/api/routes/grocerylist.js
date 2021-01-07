const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const grocerylistController = require("../controllers/grocerylist");

router.get("/", checkAuth, grocerylistController.grocerylist_get_all);

router.post("/", checkAuth, grocerylistController.grocerylist_post);

router.get(
  "/:grocerylistId",
  checkAuth,
  grocerylistController.grocerylist_get_single
);

router.patch("/:grocerylistId", grocerylistController.grocerylist_patch);

router.delete(
  "/:grocerylistId",
  checkAuth,
  grocerylistController.grocerylist_delete
);

module.exports = router;
