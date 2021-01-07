const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const planController = require("../controllers/plan");

router.get("/", checkAuth, planController.plan_get_all);

router.post("/", checkAuth, planController.plan_post);

router.get("/:dayPlanId", checkAuth, planController.plan_get_single);

router.patch("/:dayPlanId", planController.plan_patch);

router.delete("/:dayPlanId", checkAuth, planController.plan_delete);

module.exports = router;
