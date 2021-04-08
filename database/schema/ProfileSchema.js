// // Package
// const Mongoose = require("mongoose");
// const MongooseHidden = require("mongoose-hidden");

// // Mongoose Schema Declaration
// const Schema = Mongoose.Schema;

// // Profile Screen Column
// const PROFILE_COLUMN = require("../column/ProfileColumn.js");

// const ProfileSchema = new Schema(
//     {
//         [PROFILE_COLUMN.USER_ID]: {
//             type: String,
//             required: true,
//         },
//         [PROFILE_COLUMN.USER_NAME]: {
//             type: String,
//             required: true,
//             minlength: 3,
//             maxlength: 20,
//             trim: true,
//         },
//         [PROFILE_COLUMN.DATE_OF_BIRTH]: {
//             type: String,
//         },
//         [PROFILE_COLUMN.ADDRESS]: {
//             type: Object,
//         },
//         [PROFILE_COLUMN.PHONE_NO]: {
//             type: Number,
//             required: true,
//             min: 1111111111,
//             max: 9999999999,
//         },
//         [PROFILE_COLUMN.MAIL_ID]: {
//             type: String,
//             required: true,
//         },
//         [PROFILE_COLUMN.PROFILE_PICTURE_ID]: {
//             type: String,
//         },
//         [PROFILE_COLUMN.AVATAR_ID]: {
//             type: String,
//         },
//         [PROFILE_COLUMN.ABOUT]: {
//             type: String,
//             maxlength: 200,
//         },
//         [PROFILE_COLUMN.COLLEGE_NAME]: {
//             type: String,
//             required: true,
//         },
//         [PROFILE_COLUMN.STUDENT_NO]: {
//             type: Number,
//             required: true,
//         },
//         [PROFILE_COLUMN.BATCH_FROM]: {
//             type: Number,
//             required: true,
//         },
//         [PROFILE_COLUMN.BATCH_TO]: {
//             type: Number,
//             required: true,
//         },
//         [PROFILE_COLUMN.STREAM]: {
//             type: String,
//             required: true,
//         },
//         [PROFILE_COLUMN.SECTION]: {
//             type: String,
//             required: true,
//             maxlength: 1,
//         },
//         [PROFILE_COLUMN.EXPERIENCE]: {
//             type: Array,
//         },
//         [PROFILE_COLUMN.EDUCATION]: {
//             type: Array,
//         },
//         [PROFILE_COLUMN.SKILLS]: {
//             type: Array,
//         },
//         [PROFILE_COLUMN.WORKED_DOMAIN]: {
//             type: Array,
//         },
//         [PROFILE_COLUMN.DOMAIN_TO_TUTOR]: {
//             type: Array,
//         },
//         [PROFILE_COLUMN.ACHIEVEMENTS]: {
//             type: Array,
//         },
//     },
//     {
//         timestamps: {
//             createdAt: "created_at",
//             updatedAt: "updated_at",
//         },
//     }
// );

// ProfileSchema.plugin(MongooseHidden);

// // Profile Schema Model
// module.exports = Mongoose.model("ProfileSchema", ProfileSchema);
