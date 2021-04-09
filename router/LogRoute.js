const Router = require("express").Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DJUSER = require("../dbo/dj_user");
const LoggerUtil =require('../utils/LoggerUtil')
const Env = require("dotenv").config({ path: require("find-config")(".env") });
Router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        const passwordHash = await bcrpyt.hash(password, 10);
        const dj_user = new DJUSER({
            username,
            email,
            password: passwordHash,
        });

        const save = await dj_user.save();
        return LoggerUtil.response(req, res, save);
    } catch (error) {
        return LoggerUtil.error(req, res, 404, error);
    }
});

Router.post("/login", async (req, res) => {
    try {
        const find_user = await DJUSER.findOne({ email: req.body.email });
        if (!find_user) {
            return res.status(400).json({ error: "No User Found" });
        }
        const IsPasswordTrue = await bcrpyt.compare(
            req.body.password,
            find_user.password
        );
        if (!IsPasswordTrue) {
            return res.status(400).json({ error: "Password IS Wrong" });
        }
        const jwt_user = {
            _id: find_user._id,
        };
        const { username, email, _id } = find_user;
        const token = await jwt.sign(jwt_user,Env.parsed.JWT_SECRET_KEY);
        console.log({ username, email, token , id: _id });
        // return res.status(200).json({ username, email, token, id: _id });
        return LoggerUtil.response(req, res, { username, email, token , id: _id });
    } catch (error) {
        return LoggerUtil.error(req, res, 404, error);
    }
});

Router.get("/checkAuth",async (req,res)=>{
    try {
        const data = jwt.decode(req.body.token);
        console.log(data);
        const IsToken = await jwt.verify(
            req.body.token,
            Env.parsed.JWT_SECRET_KEY
        );
        if (!IsToken) {
            throw "Authentication Failed";
        }
        return LoggerUtil.response(req, res, IsToken);
    } catch (error) {
        return LoggerUtil.error(req, res, 404, error);
    }
});
module.exports = Router;