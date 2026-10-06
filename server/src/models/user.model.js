import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },

    password: {
        type: String,
        required: true,
        min: [8, "Pasword must have at least 8 characters"],
    },

    avatar: {
        type: String,
    },

    bio: {
        type: String,
    },

    workspace: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
        }
    ],

    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        }
    ],

    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        }
    ],
}, {
    timestamps: true,
})





export const User = mongoose.model("User", userSchema);