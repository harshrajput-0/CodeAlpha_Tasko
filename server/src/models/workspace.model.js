import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member',
        },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

workspaceSchema.index({ 'members.user': 1 });

export const Workspace = mongoose.model('Workspace', workspaceSchema);
