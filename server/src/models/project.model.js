import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    description: {
        type: String,
    },

    projectLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
    },

    status: {
        type: String,
        enum: ["Not Started", "In Progress", "On Hold", "Completed"],
        default: "Not Started",
    },

    startDate: {
        type: Date,
    },

    endDate: {
        type: Date,
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],

    board: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
        }
    ],

}, {
    timestamps: true,
})

export const Project = mongoose.model("Project", projectSchema);