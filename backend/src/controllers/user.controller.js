import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";
const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    if (!name || !email || !password) {
        throw new ApiError(400, 'Please provide all fields');
    }
    const existedUser = await User.findOne({
        email
    })
    if (existedUser) {
        throw new ApiError(400, 'User already exists');
    }
    const user = await User.create({
        name,
        email,
        password
    })

    const created_user = await User.findById(user._id).select('-password -refreshToken');
    if (!created_user) {
        throw new ApiError(500, 'Error creating user');
    }
    return res.status(200).json(new ApiResponse(200, created_user, 'User created successfully'));
})


const login = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, 'please provide all fields');
    }

    const user = await User.findOne(
        { $or: [{ email }, { name }] }
    )
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    const isPasswordValid = await user.isPasswordCorrect(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None', // Needed for cross-origin cookies
      };

    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, refreshToken, accessToken }, 'User logged in successfully'));
});

const logout = asyncHandler(async (req, res, next) => {
    const id = req.user._id;

    // Blacklist the access token (optional: store it in Redis or DB with expiration)
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
        await BlacklistToken.create({ token: accessToken }); // Assuming BlacklistToken is a model
    }

    // Clear refresh token in the database
    await User.findByIdAndUpdate(
        id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );

    // Clear cookies
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None', // Needed for cross-origin cookies
      };
    return res.status(200)
        .clearCookie('refreshToken', options)
        .clearCookie('accessToken', options)
        .json(new ApiResponse(200, {}, 'User logged out successfully'));
});


const authStatus = asyncHandler(async (req, res, next) => {
    res.status(200).json(new ApiResponse(200, { authenticated: true, user: req.user }, 'User authenticated successfully'))
})



export { signup, login, logout, authStatus }