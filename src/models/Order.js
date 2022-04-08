import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                price: {
                    type: Number,
                },
                cost: {
                    type: Number,
                },
                color: {
                    type: String,
                },
                storage: {
                    type: String,
                },
                quantity: {
                    type: Number,
                },
            },
        ],
        price: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["pending", "confirm", "shipping", "done", "close"],
            default: "pending",
        },
        shippingInfo: {
            fullname: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            email: {
                type: String,
            },
            address: {
                type: String,
            },
            note: {
                type: String,
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
