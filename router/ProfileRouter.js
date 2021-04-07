// Imports
const Express = require("express");

// Router Declaration
const ProfileRouter = Express.Router();

// Schema  Imports
const ProfileService = require("../service/ProfileService.js");

//Logger Utils
const LoggerUtil = require("../utils/LoggerUtil.js");

ProfileRouter.post("/newProfile", async (req, res) => {
    try {
        // console.log(req.body);
        const result = await ProfileService.SaveProfileService({ ...req.body });
        return LoggerUtil.response(req, res, result);
    } catch (error) {
        return LoggerUtil.error(req, res, 400, error);
    }
});

ProfileRouter.get("/getAllProfile/:id", async (req, res) => {
    const UserID = req.params.id;
    try {
        const result = await ProfileService.getAllProfileService(UserID);
        return LoggerUtil.response(req, res, result);
    } catch (error) {
        return LoggerUtil.error(req, res, 404, error);
    }
});

ProfileRouter.get("/viewProfile/:id", async (req, res) => {
    const UserID = req.params.id;
    console.log(UserID);
    try {
        const result = await ProfileService.viewProfileService(UserID);
        return LoggerUtil.response(req, res, result);
    } catch (error) {
        return LoggerUtil.error(req, res, 404, error);
    }
});

// ProfileRouter.post("/updateProfile", async (req, res) => {
//     // let id = req.params.id;
//     let conditionMap = req.body.conditionMap;
//     let dataMap = req.body.dataMap;
//     try {
//         const result = await ProfileDbo.updateProfile({
//             conditionMap,
//             dataMap,
//         });
//         return LoggerUtil.response(req, res, result);
//     } catch (error) {
//         return LoggerUtil.error(req, res, 404, error);
//     }
// });

// ProfileRouter.post("/deleteProfile/:id", async (req, res) => {
//     let user_id = req.params.id;
//     try {
//         const result = await ProfileDbo.deleteProfile({ user_id });
//         return LoggerUtil.response(req, res, result);
//     } catch (error) {
//         return LoggerUtil.error(req, res, 404, error);
//     }
// });

module.exports = ProfileRouter;
