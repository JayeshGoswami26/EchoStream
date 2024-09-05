import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: [true, "Video File is required"],
        },
        thumbnailFile: {
            type: String,
            required: [true, "Thumbnail File is required"],
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            maxLength: 100,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        duration: {
            type: Number, // form cloudinary :: cloudinary sendes duration and information with the video
            required: [true, "Duration is required"],
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema);
