import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },

    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'In Review', 'Done'],
      default: 'To Do',
    },

    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },

    effort: {
      type: String,
      enum: ['Small', 'Medium', 'Large'],
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },

    // Who created the task / who last assigned it.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    dueDate: {
      type: Date,
    },

    // Position inside the board column (for drag and drop).
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model('Task', taskSchema);
