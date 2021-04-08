// Packages
const Express = require("express");

// Router Initialization
const Router = Express.Router();

// imports
//const ProfileRouter = require("../router/ProfileRouter.js");
const JWTRouter = require("../router/LogRoute.js")
const ProductRouter = require("../router/ProductRoute.js")
Router.get('/',()=>{
    console.log("Router Mux")
})

Router.use(JWTRouter)
Router.use(ProductRouter)

// Testing Router
Router.get("/ping", (req, res) => {
    res.send("pong from server");
});

module.exports = Router;
