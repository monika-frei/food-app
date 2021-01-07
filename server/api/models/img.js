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
module.exports = mongoose.model("Img", ImgSchema);
