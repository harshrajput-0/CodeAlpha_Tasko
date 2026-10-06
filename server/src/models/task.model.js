import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
    },

    effort: {
        type: String,
        enum: ["Small", "Medium", "Large"],
    },

    assigne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    dueDate: {
        type: Date,
    },
  
}, {
    timestamps: true,
})