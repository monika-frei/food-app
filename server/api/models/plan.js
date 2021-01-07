const mongoose = require("mongoose");
const { Schema } = mongoose;

const dayPlanSchema = new Schema({
  _id: Schema.Types.ObjectId,
  day: String,
  date: String,
  plan: {
    breakfast: [{ type: Object, ref: "Recipe" }],
    lunch: [{ type: Object, ref: "Recipe" }],
    dinner: [{ type: Object, ref: "Recipe" }],
    snacks: [{ type: Object, ref: "Recipe" }],
  },
  userId: { type: String, ref: "User" },
});

module.exports = mongoose.model("DayPlan", dayPlanSchema);
