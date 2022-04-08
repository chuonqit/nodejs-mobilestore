import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";
import { createHmac } from "crypto";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        role: {
            type: String,
            enum: ["ADMIN", "MANAGER"],
        },
        salt: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.methods = {
    getFirstName(fullname) {
        const nameArr = fullname.split(" ");
        return nameArr[nameArr.length - 1];
    },
    getLastName(fullname) {
        const nameArr = fullname.split(" ");
        nameArr.pop();
        return nameArr.join(" ");
    },
    encrytPassword(password) {
        if (!password) return;
        try {
            return createHmac("sha256", this.salt).update(password).digest("hex");
        } catch (error) {
            console.log(error);
        }
    },
    authenticate(password) {
        return this.encrytPassword(password) == this.password;
    },
};

userSchema.pre("save", async function save(next) {
    try {
        this.salt = uuid4();
        this.password = this.encrytPassword(this.password);
        this.firstName = this.getFirstName(this.fullname);
        this.lastName = this.getLastName(this.fullname);
        return next();
    } catch (err) {
        return next(err);
    }
});

export default mongoose.model("User", userSchema);
