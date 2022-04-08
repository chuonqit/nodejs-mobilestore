import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Configuration", configurationSchema);
