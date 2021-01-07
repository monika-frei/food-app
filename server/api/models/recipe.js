const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImgSchema = new Schema(
  {
    img: { data: Buffer, contentType: String },
  },
  {
    timestamps: true,
  }
);

const ingredientSchema = new Schema({
  id: Number,
  title: String,
  amount: String,
  unit: String,
});

const preparationSchema = new Schema({
  step: Number,
  content: String,
});

const recipeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  category: [String],
  title: { type: String, required: true },
  ingredients: [ingredientSchema],
  preparation: [preparationSchema],
  time: String,
  servings: String,
  info: String,
  recipeImage: ImgSchema,
  userId: { type: String, ref: "User" },
});

module.exports = mongoose.model("Recipe", recipeSchema);
