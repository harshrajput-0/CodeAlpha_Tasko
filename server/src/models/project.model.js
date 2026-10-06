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

    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
        index: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    projectLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    teamMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

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
        validate: {
            validator: function (value) {
                return !this.startDate || !value || value >= this.startDate;
            },
            message: "endDate cannot be before startDate",
        },
    },

}, {
    timestamps: true,
});

projectSchema.index({ teamMembers: 1 });

export const Project = mongoose.model("Project", projectSchema);
