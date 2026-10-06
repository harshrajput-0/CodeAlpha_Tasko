import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    boardName: {
        type: String,
        required: true,
    },

    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        }
    ],

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
}, {
    timestamps: true,
});

export const Board = mongoose.model("Board", boardSchema);