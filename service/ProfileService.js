const UserDbo = require("../dbo/AuthDbo.js");
const ProfileDbo = require("../dbo/ProfileDbo.js");

exports.SaveProfileService = async (data) => {
    try {
        let user_id = data.user_id;
        let phone_no = data.phone_no;
        let student_no = data.student_no;
        let batch_from = data.batch_from;
        let batch_to = data.batch_to;

        //parsing to numbers
        phone_no =
            phone_no.constructor === String ? parseInt(phone_no) : phone_no;
        student_no =
            student_no.constructor === String
                ? parseInt(student_no)
                : student_no;
        batch_from =
            batch_from.constructor === String
                ? parseInt(batch_from)
                : batch_from;
        batch_to =
            batch_to.constructor === String ? parseInt(batch_to) : batch_to;

        const ParsedData = {
            ...data,
            phone_no,
            student_no,
            batch_from,
            batch_to,
        };
        const user = await UserDbo.findUser({ user_id });
        console.log(user.profile_filled);
        if (!user.profile_filled) {
            const result = await ProfileDbo.createProfile({ ...ParsedData });
            const updateUser = await UserDbo.updateUser({
                conditionMap: { _id: user_id },
                dataMap: {
                    profile_filled: true,
                },
            });
            return result;
        } else {
            console.log("HI");
            return await ProfileDbo.readProfile({ user_id: user_id });
        }
    } catch (err) {
        throw err;
    }
};

exports.getAllProfileService = async (user_id) => {
    try {
        const allProfile = await ProfileDbo.getAllProfile(user_id);
        return allProfile;
    } catch (err) {
        throw err;
    }
};

exports.viewProfileService = async (userId) => {
    try {
        const allProfile = await ProfileDbo.viewProfile({ _id: userId });
        return allProfile;
    } catch (err) {
        throw err;
    }
};
