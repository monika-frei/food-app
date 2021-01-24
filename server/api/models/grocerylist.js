const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  amount: Number,
  unit: String,
  id: String,
}); //coś się tu crashuje

const grocerylistSchema = new Schema({
  groceryList: [itemSchema],
  userId: { type: String, ref: "User" },
});

module.exports = mongoose.model("Grocerylist", grocerylistSchema);
