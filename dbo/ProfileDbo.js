const Mongoose = require("mongoose");
const ProfileSchema = require("../database/schema/ProfileSchema.js");
const ProfileColumn = require("../database/column/ProfileColumn.js");
// const mongoose = require("mongoose");
exports.createProfile = async (data) => {
    let insertMap = {
        [ProfileColumn.USER_ID]: data.user_id,
        [ProfileColumn.USER_NAME]: data.username,
        [ProfileColumn.DATE_OF_BIRTH]: data.date_of_birth,
        [ProfileColumn.ADDRESS]: data.address,
        [ProfileColumn.PHONE_NO]: data.phone_no,
        [ProfileColumn.MAIL_ID]: data.mail_id,
        [ProfileColumn.PROFILE_PICTURE_ID]: data.profile_picture_id,
        [ProfileColumn.AVATAR_ID]: data.avatar_id,
        [ProfileColumn.ABOUT]: data.about,
        [ProfileColumn.COLLEGE_NAME]: data.college_name,
        [ProfileColumn.STUDENT_NO]: data.student_no,
        [ProfileColumn.BATCH_FROM]: data.batch_from,
        [ProfileColumn.BATCH_TO]: data.batch_to,
        [ProfileColumn.STREAM]: data.stream,
        [ProfileColumn.SECTION]: data.section,
        [ProfileColumn.EXPERIENCE]: data.experience,
        [ProfileColumn.EDUCATION]: data.education,
        [ProfileColumn.SKILLS]: data.skills,
        [ProfileColumn.WORKED_DOMAIN]: data.worked_domain,
        [ProfileColumn.DOMAIN_TO_TUTOR]: data.domain_to_tutor,
        [ProfileColumn.ACHIEVEMENTS]: data.achievements,
        [ProfileColumn.CONNECTION_COUNT]: data.connection_count,
        [ProfileColumn.VIEWERS_COUNT]: data.viewers_count,
    };
    try {
        return await ProfileSchema.insertMany([insertMap]);
    } catch (err) {
        throw err;
    }
};

exports.getAllProfile = async (user_id) => {
    // skip and limit doc for cleint side
    try {
        const requestLookupResponse = await ProfileSchema.aggregate([
            { $match: { user_id: { $eq: user_id } } },
            {
                $lookup: {
                    from: "connectionschemas",
                    localField: "user_id",
                    foreignField: "user_id_from",
                    as: "connections",
                },
            },
            {
                $project: {
                    _id: 0,
                    connections: {
                        $map: {
                            input: "$connections",
                            as: "con",
                            in: "$$con.user_id_to",
                        },
                    },
                },
            },
        ]);
        const sentLookupResponse = await ProfileSchema.aggregate([
            { $match: { user_id: { $eq: user_id } } },
            {
                $lookup: {
                    from: "connectionschemas",
                    localField: "user_id",
                    foreignField: "user_id_to",
                    as: "connections",
                },
            },
            {
                $project: {
                    _id: 0,
                    connections: {
                        $map: {
                            input: "$connections",
                            as: "con",
                            in: "$$con.user_id_from",
                        },
                    },
                },
            },
        ]);
        let connections = [
            ...requestLookupResponse[0].connections,
            ...sentLookupResponse[0].connections,
        ];
        console.log(connections);
        let response = await ProfileSchema.aggregate([
            {
                $match: {
                    $and: [
                        { user_id: { $ne: user_id } },
                        { user_id: { $nin: connections } },
                    ],
                },
            },
            {
                $project: {
                    _id: 1,
                    user_id: 1,
                    college_name: 1,
                    username: 1,
                },
            },
        ]);
        return response;
    } catch (err) {
        throw err;
    }
};

exports.viewProfile = async (condtionMap) => {
    console.log(condtionMap);
    try {
        const response = await ProfileSchema.aggregate()
            .match({
                user_id: { $eq: condtionMap._id },
            })
            .project({ __v: 0, created_at: 0, updated_at: 0 });
        console.log(response);
        if (!response) {
            throw "No user found";
        }
        return response;
    } catch (err) {
        throw err;
    }
};

exports.updateProfile = async ({ conditionMap, dataMap }) => {
    let condition = {
        _id: Mongoose.Types.ObjectId(conditionMap._id),
    };
    try {
        const response = await ProfileSchema.findOneAndUpdate(
            condition,
            dataMap,
            { new: true }
        ).exec();
        return response;
    } catch (err) {
        throw err;
    }
};

exports.deleteProfile = async ({ user_id }) => {
    let id = Mongoose.Types.ObjectId(user_id);
    try {
        const response = await ProfileSchema.findOneAndDelete({ _id: id });
        return response;
    } catch (err) {
        throw err;
    }
};

// {
//     "user_id":"6006aca5bba14e1058b60133",
//     "username":"siva",
//     "date_of_birth":"14-1-2001",
//     "address":"nagapattinam",
//     "phone_no":"9898989999",
//     "mail_id":"praghatieshss@gmail.com",
//     "about":"Lover boy",
//     "college_name":"KNCET",
//     "student_no":"621317106074",
//     "batch_from":"2017",
//     "batch_to":"2021",
//     "stream":"ECE",
//     "section":"B",
//     "experience":{"com":"siva"},
//     "education":{"clg":"Mass"},
//     "skills":["react","html"],
//     "achievements":"no",
//     "connection_count": 0,
//     "viewers_count":0
// }
