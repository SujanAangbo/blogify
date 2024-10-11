const User = require("../model/user_model");
const { createHmac } = require("crypto");
const { generateToken, validateToken } = require("../services/authorization");



async function handleUserSignup(req, res) {
    const { fullname, email, password } = req.body;

    const createdUser = await User.create({ fullname: fullname, email: email, password: password, profileImage: `/profiles/${req.file.filename}`});

    if (!createdUser) return res.render("signup", { error: "Unable to create user" });

    const token = generateToken(createdUser);

    return res.cookie("token", token).redirect("/");

}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) return res.render("login", { error: "No user found with this email address" });

    const salt = foundUser.salt;

    const generatedHashed = createHmac("sha256", salt)
        .update(password)
        .digest('hex');

    if (generatedHashed !== foundUser.password)
        return res.render("login", { error: "Incorrect Password" });

    const token = generateToken(foundUser);

    return res.cookie("token", token).redirect("/");

}

async function handleUserLogout(req, res) {

    res.clearCookie("token");

    return res.redirect("/");

}



module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
}