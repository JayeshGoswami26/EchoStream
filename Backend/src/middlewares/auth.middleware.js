import { ApiErrorHandler } from "../utils/apiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

        

        if (!token) {
            throw new ApiErrorHandler(
                401,
                "Not authorized, you must be logged in first."
            );
        }

        const decodedToken = jwt.verify( token , process.env.ACCESS_TOKEN);


        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiErrorHandler(403, "Unauthorized, invalid token.");
        }

        req.user = user;

        next();
    } catch (error) {
      console.log(error.message);
        throw new ApiErrorHandler(401, "Authentication failed" + error.message);
    }
});

// This function is used to verify a JSON Web Token to authenticate user.
