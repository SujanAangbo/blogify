const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");

const userSchema = Schema({
    fullname: {
        required: true,
        type: String
    },
    email: { required: true, type: String, unique: true },
    password: { type: String, required: true },
    salt: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    profileImage: { type: String, default: "/images/avatar.jpg" }
}, { timestamps: true, collection: "user" });

userSchema.pre("save", function (next) {

    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    console.log(`salt: ${salt}`);

    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

const User = model("user", userSchema);

module.exports = User;