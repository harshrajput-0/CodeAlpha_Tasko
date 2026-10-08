import { ApiError } from './ApiError.js';
import { User } from '../models/user.model.js';

export const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
};
