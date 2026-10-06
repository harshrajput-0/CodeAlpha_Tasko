import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    boardName: {
        type: String,
        required: true,
        trim: true,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
        index: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

export const Board = mongoose.model("Board", boardSchema);
