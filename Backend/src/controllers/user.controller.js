import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrorHandler } from "../utils/apiErrorHandler.js";
import { User } from "../models/user.model.js";
import { uploadFilesOnCloudinary } from "..//utils/cloudinary.js";
import { ApiResponseHandler } from "../utils/apiResponseHandler.js";

const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);

        if (!user) {
            throw new ApiErrorHandler(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        // console.log(`Access token: ${accessToken}`)

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiErrorHandler(
            500,
            "Error generating access and refresh token "
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    /* Steps for user registration :: 
       1. getting users data from frontend
       2. validating data 
       3. checking if user already exists in the database
       4. Checking if images are available
       5. uploading images to a cloud storage service
       6. hashing the password
       7. creating a new user object with hashed password and other details
       8. saving the user to the database
       9. removing the password and refresh token form the database
       10. sending a welcome email to the user
       11. send response back to the frontend
       Note : This is a very basic example and real-world applications would require more robust error handling, input validation, and database connection setup. 
    */

    const { userName, email, fullName, password } = req.body;
    console.log(
        `User ${userName ? userName : null} registered with ${email ? email : null}`
    );

    if (
        [userName, email, fullName, password].some(
            (field) => toString(field).trim() === ""
        )
    ) {
        throw new ApiErrorHandler(400, "All fields are required");
    }

    const existedUser = await User.findOne({ userName });

    if (existedUser) {
        console.log(`User :: ${userName} its already registered`);
        throw new ApiErrorHandler(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiErrorHandler(400, "Avatar is required");
    }
    if (!coverImageLocalPath) {
        throw new ApiErrorHandler(400, "Cover Image is required");
    }

    const avatar = await uploadFilesOnCloudinary(avatarLocalPath);
    const coverImage = await uploadFilesOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiErrorHandler(500, "Failed to upload avatar");
    }
    if (!coverImage) {
        throw new ApiErrorHandler(500, "Failed to upload cover image");
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        fullName,
        password,
        avatar: avatar.url,
        coverImage: coverImage.url,
    });

    const UserCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!UserCreated) {
        throw new ApiErrorHandler(500, "Failed to create user");
    }

    return res
        .status(201)
        .json(
            new ApiResponseHandler(
                201,
                UserCreated,
                "User registered successfully "
            )
        );
});

const loginUser = asyncHandler(async (req, res) => {
    /*   Steps for Login User
        1. Get data from frontend such as userName or email and Password || EchoStream is based on userName or email and Password based login
        2. Validate the data and check if the user credentials are correct patterns
        3. check if the user exists in the database and password is same as the password in database
        4. If credentials are correct, generate a access JWT token with user details and send it back to the frontend as cookie (secure)
    */

    const { userName, email, password } = req.body;

    if (!(userName || !email)) {
        throw new ApiErrorHandler(400, "Username or email is required");
    }

    const user = await User.findOne({ $or: [{ userName }, { email }] });

    if (!user) {
        throw new ApiErrorHandler(404, "User not found");
    }

    const userPassword = await user.isPasswordCorrect(password);

    if (!userPassword) {
        throw new ApiErrorHandler(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    console.table(["accessToken", accessToken, "refreshToken", refreshToken]);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const option = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponseHandler(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
});
const logoutUser = asyncHandler(async (req, res) => {
    /* Steps for Logout User
        1. Check if accessToken is present in the request headers
        2. If accessToken is present, remove it from the database and send a response to the frontend indicating successful logout
    */

    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: undefined } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponseHandler(200, null, "User logged out successfully")
        );
});

export { registerUser, loginUser, logoutUser };
