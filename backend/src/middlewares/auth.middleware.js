import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from '../models/user.model.js';
import { BlacklistToken } from "../models/blacklistToken.model.js";
export const verifyJWT = asyncHandler(async (req, _, next) => {
    const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        throw new ApiError(401, 'Not authorized to access this route');
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, 'User not found,Invalid Access Token')
    }
    req.user = user;
    next();
})



export const checkBlacklist = async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new ApiError(401, "No token provided"));
    }

    const blacklisted = await BlacklistToken.findOne({ token }); 
    if (blacklisted) {
        return next(new ApiError(401, "Token has been revoked"));
    }

    next();
};
