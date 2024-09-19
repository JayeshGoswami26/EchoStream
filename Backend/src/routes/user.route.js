import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updatedUserCoverImage,
    updateUserAvatar,
    updateUserDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/update-user").post(verifyJWT, updateUserDetails);

router.route("/update-avatar").post(
    upload.fields({
        name: "avatar",
        maxCount: 1,
    }),
    verifyJWT,
    updateUserAvatar
);

router.route("/update-coverImage").post(
    upload.fields({
        name: "coverImage",
        maxCount: 1,
    }),
    verifyJWT,
    updatedUserCoverImage
);

router.route('/get-user').get(verifyJWT,getCurrentUser)

export default router;
