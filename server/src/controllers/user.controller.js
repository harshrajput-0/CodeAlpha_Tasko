import jwt from 'jsonwebtoken';

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

import { User } from '../models/user.model.js';
import { generateAccessAndRefreshTokens } from '../utils/generateTokens.js';
import { OPTIONS } from '../constants.js';

// ======| REGISTER USER |--------------------------------------
export const registerUser = asyncHandler(async (req, res) => {
  // Getting data from frontend
  const { fullName, email, password } = req.body;

  // Validation
  if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
    throw new ApiError(400, 'All Fields are required');
  }

  // check existing user
  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  // Creating User
  const user = await User.create({ fullName, email, password });

  return res
    .status(201)
    .json(new ApiResponse(201, user, 'User registered successfully'));
});

// ======| LOGIN USER |--------------------------------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Please enter account details');
  }

  // Find account
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select('+password');

  if (!user) {
    throw new ApiError(404, 'User does not found');
  }

  // Check Password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid Credentials');
  }

  // Generate Token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // To avoid password hash exposure
  const loggedInUser = await User.findById(user._id);

  return res
    .status(200)
    .cookie('accessToken', accessToken, OPTIONS)
    .cookie('refreshToken', refreshToken, OPTIONS)
    .json(new ApiResponse(200, loggedInUser, 'User logged In Successfully'));
});

// ======| LOGOUT USER |--------------------------------------
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .clearCookie('accessToken', OPTIONS)
    .clearCookie('refreshToken', OPTIONS)
    .json(new ApiResponse(200, {}, 'User logged out'));
});

// ======| getMe |--------------------------------------
export const getMe = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, 'User fetched successfully'));
});

// ======| REFRESH ACCESS TOKEN |--------------------------------------
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized Request');
  }

  try {
    // decoded Token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select('+refreshToken');

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is either expired or used');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie('accessToken', accessToken, OPTIONS)
      .cookie('refreshToken', newRefreshToken, OPTIONS)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          'Access token refreshed'
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
});

// ======| CHANGE PASSWORD |----------------------------------------
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, 'Old password and new password are required');
  }

  const user = await User.findById(req.user._id).select("+password");
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid old password');
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password changed sucessfully'));
});

// ======| UPDATE PROFILE |----------------------------------------
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, bio, avatar } = req.body;

  const user = await User.findById(req.user._id);
  if (fullName !== undefined) user.fullName = fullName;
  if (avatar !== undefined) user.avatar = avatar;
  if (bio !== undefined) user.bio = bio;

  const updatedUser = await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, 'Profile Updated Successfully'));
});
