const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("./../utils/dateFormat");

// Schema to create a course model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            [reactionSchema]
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const Course = model("course", courseSchema);

module.exports = Course;
