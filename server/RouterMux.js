// Packages
const Express = require("express");

// Router Initialization
const Router = Express.Router();

// imports
const ProfileRouter = require("../router/ProfileRouter.js");



Router.use(ProfileRouter);


// Testing Router
Router.get("/ping", (req, res) => {
    res.send("pong from server");
});

module.exports = Router;
