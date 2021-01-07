const mongoose = require("mongoose");
const DayPlan = require("../models/plan");

exports.plan_get_all = (req, res, next) => {
  const loggedUserId = req.userData.userId;
  DayPlan.find({ userId: loggedUserId })
    .select("-__v")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        plan: docs.map((doc) => {
          return {
            _id: doc._id,
            day: doc.day,
            date: doc.date,
            plan: {
              breakfast: doc.plan.breakfast,
              lunch: doc.plan.lunch,
              dinner: doc.plan.dinner,
              snacks: doc.plan.snacks,
            },
            recipes: [
              ...doc.plan.breakfast.map((item) => item._id),
              ...doc.plan.lunch.map((item) => item._id),
              ...doc.plan.dinner.map((item) => item._id),
              ...doc.plan.snacks.map((item) => item._id),
            ],
            request: {
              type: "GET",
              url: `https://fodd-app-server.herokuapp.com/plan/${doc._id}`,
            },
            userId: doc.userId,
          };
        }),
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

exports.plan_post = (req, res, next) => {
  const dayPlan = new DayPlan({
    _id: new mongoose.Types.ObjectId(),
    day: req.body.day,
    date: req.body.date,
    plan: {
      breakfast: req.body.recipes.breakfast,
      lunch: req.body.recipes.lunch,
      dinner: req.body.recipes.dinner,
      snacks: req.body.recipes.snacks,
    },
    userId: req.userData.userId,
  });

  dayPlan
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created day plan",
        createdDayPlan: {
          _id: result._id,
          day: result.day,
          date: result.date,
          plan: {
            breakfast: result.plan.breakfast,
            lunch: result.plan.lunch,
            dinner: result.plan.dinner,
            snacks: result.plan.snacks,
          },
          userId: result.userId,
        },
        request: {
          type: "GET",
          url: `https://fodd-app-server.herokuapp.com/plan/${result._id}`,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.plan_get_single = (req, res, next) => {
  const id = req.params.dayPlanId;
  const loggedUserId = req.userData.userId;
  DayPlan.findById(id)
    .select("-__v")
    .exec()
    .then((doc) => {
      if (doc && doc.userId === loggedUserId) {
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

exports.plan_patch = (req, res, next) => {
  const id = req.params.dayPlanId;
  DayPlan.update(
    { _id: id },
    {
      $set: {
        day: req.body.day,
        date: req.body.date,
        plan: {
          breakfast: req.body.plan.breakfast,
          lunch: req.body.plan.lunch,
          dinner: req.body.plan.dinner,
          snacks: req.body.plan.snacks,
        },
      },
    }
  )
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Day plan updated",
        request: {
          type: "GET",
          url: `https://fodd-app-server.herokuapp.com/plan/${id}`,
        },
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.plan_delete = (req, res, next) => {
  const planId = req.params.dayPlanId;
  DayPlan.findByIdAndDelete(planId)
    .exec()
    .then((result) =>
      res.status(200).json({
        message: "Plan deleted",
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
