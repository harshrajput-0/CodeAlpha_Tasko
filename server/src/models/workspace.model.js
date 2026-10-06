import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        // maximum length 
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        }
    ],
    // slug optional 

}, {
    timestamps: true,
})


export const Workspace = mongoose.model("Workspace", workspaceSchema);