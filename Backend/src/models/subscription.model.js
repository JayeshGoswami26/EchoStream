import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId, // user who is subscribed to channel
            ref: "User",
            required: true,
        },
        channel: {
            type: Schema.Types.ObjectId, // channel which user is subscribing to
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
