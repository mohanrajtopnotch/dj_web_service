const jwt = require("jsonwebtoken");
const Env = require("dotenv").config({ path: require("find-config")(".env") });
exports.checkAuth = async (req, res, next) => {
    try {
        const data = jwt.decode(req.body.token);
        console.log(data);
        const IsToken = await jwt.verify(
            req.body.token,
            process.Env.JWT_SECRET_KEY
        );
        if (!IsToken) {
            throw "Authentication Failed";
        }
        return res.status(200).json({ success: "User Verified" });
    } catch (err) {
        return res.status(404).json({ error: err });
    }
};
