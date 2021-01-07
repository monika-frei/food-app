const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = newSchema({
  _id: Schema.Types.ObjectId,
  title: String,
  amount: Number,
  unit: String,
  id: String,
});

const grocerylistSchema = new Schema({
  groceryList: [itemSchema],
  userId: { type: String, ref: "User" },
});

module.exports = mongoose.model("Grocerylist", grocerylistSchema);
