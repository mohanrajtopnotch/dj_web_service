// Package
const Mongoose = require("mongoose");
const Env = require("dotenv").config({ path: require("find-config")(".env") });

exports.InitilizeDatabase = async () => {
    try {
        await Mongoose.connect(
            Env.parsed.DB_HOST,
            //{user:Env.parsed.DB_USER,pass:Env.parsed.DB_PASS, useUnifiedTopology:true,useNewUrlParser: true}
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        );
        console.log(
            new Date().toString() +
                Env.parsed.DB_HOST.slice(30).padStart(93, "*") +
                " Database connected"
        );
    } catch (error) {
        console.log(
            new Date().toString() +
                " Unable to Connect " +
                Env.parsed.DB_HOST.slice(30).padStart(93, "*")
        );
        console.log(error);
        throw error;
    }
};
