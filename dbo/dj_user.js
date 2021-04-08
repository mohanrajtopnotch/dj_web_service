const mongoose = require("mongoose");
const MongooseHidden = require("mongoose-hidden")();

const Schema = mongoose.Schema;

const DJ_USER_SCHEMA = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin:{
            type:String,
            required:false
        }
    },
    { timestamps: true }
);

DJ_USER_SCHEMA.plugin(MongooseHidden);

module.exports = mongoose.model("dj_user", DJ_USER_SCHEMA);
