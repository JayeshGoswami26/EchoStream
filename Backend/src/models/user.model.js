import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, "User Name is required"],
            unique: true,
            minLength: 3,
            maxLength: 20,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: [true, "Full Name is required"],
            minLength: 3,
            maxLength: 50,
            trim: true,
        },
        avatar: {
            type: String, // cloudinary service will give url as string
            default: "https://i.postimg.cc/L4bCVw9Y/Avatar.png",
            required: [true, "Avatar is required"],
        },
        coverImage: {
            type: String, // cloudinary service will give url as string
            default: "https://i.postimg.cc/5Ny1khWw/Cover-Image.png",
            required: [true, "Cover Image is required"],
        },
        watchHistory: {
            type: [Schema.Types.ObjectId],
            ref: "Video",
            default: [],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: 8,
        },
        refreshToken: {
            type: String,
            required: false,
            default: null,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken =  function () {
     return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    // console.log(`Generated access token: ${accessTokenTest}`)
};

userSchema.methods.generateRefreshToken =  function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);
