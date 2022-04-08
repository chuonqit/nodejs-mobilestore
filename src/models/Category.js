import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        nameAscii: {
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

export default mongoose.model("Category", categorySchema);
