const mongoose = require("mongoose");
const MongooseHidden = require("mongoose-hidden")();

const Schema = mongoose.Schema;

const DJ_PRODUCT_SCHEMA = new Schema(
  {
    _id:mongoose.Schema.Types.ObjectId ,
    title: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: false,
    },
    productImage:{
      type: String,
      required: true,
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "update_at" } }
);

DJ_PRODUCT_SCHEMA.plugin(MongooseHidden);

module.exports = mongoose.model("dj_product", DJ_PRODUCT_SCHEMA);
