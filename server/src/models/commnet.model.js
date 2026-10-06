import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    content: {
        type: String,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
}, {
    timestamps: true,
})


export const Comment = mongoose.model("Comment", commentSchema);