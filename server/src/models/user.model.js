import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
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
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must have at least 8 characters'],
      select: false,
    },

    avatar: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
