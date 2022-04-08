import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Slider", sliderSchema);
