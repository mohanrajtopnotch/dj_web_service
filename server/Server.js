// packages
const Express = require("express");
const Env = require("dotenv").config({ path: require("find-config")(".env") });
const Cors = require("cors");
const Http = require("http");


// Imports
const Server = Express();
const CONTEXT_PATH = process.env.CONTEXT_PATH;
const PORT = process.env.PORT || 5000;
const RouterMux = require("./RouterMux.js");
const Database = require("../database/Database.js");

// App Service Start Indication
console.log(new Date().toString() + " App service started");

Server.use(Cors({ credentials: true, origin: "http://localhost:3000" }));

// Database Initialization
Database.InitilizeDatabase();

// Parsing User data
Server.use(Express.json());
Server.use(Express.urlencoded({ extended: true }));
Server.use(Express.static("uploads"))
// Router

Server.use(CONTEXT_PATH, RouterMux);
console.log("c-path", CONTEXT_PATH);
// Server is listening to port
Server.listen(PORT, () => {
    console.log(
        new Date().toString() +
            " Server is listening to port " +
            process.env.PORT
    );
});

module.exports = { Server };
