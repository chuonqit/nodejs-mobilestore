import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        nameAscii: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("ProductVariant", productVariantSchema);
