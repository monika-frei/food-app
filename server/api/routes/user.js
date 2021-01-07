const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", UserController.user_create_user);

router.post("/login", UserController.user_login_user);

router.get("/logout", UserController.user_logout_user);

router.delete("/:userId", checkAuth, UserController.user_delete_user);

module.exports = router;
