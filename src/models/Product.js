import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
        sku: {
            type: String,
            required: true,
            unique: true,
        },
        images: {
            type: Array,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        configurations: [
            {
                configuration: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Configuration",
                },
                specName: {
                    type: String,
                },
            },
        ],
        variants: [
            {
                storage: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ProductVariant",
                },
                price: {
                    type: Number,
                },
                cost: {
                    type: Number,
                },
                colors: [
                    {
                        color: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "ProductVariant",
                        },
                        stock: {
                            type: Number,
                        },
                    },
                ],
            },
        ],
        price: {
            type: Number,
        },
        cost: {
            type: Number,
        },
        description: {
            type: String,
            required: true,
        },
        purchaseCount: {
            type: Number,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
