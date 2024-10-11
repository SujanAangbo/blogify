const jwt = require("jsonwebtoken");

const secret = "$uperman@123";

function generateToken(user) {
    const payload = {
        _id: user._id,
        fullname: user.fullname,
        role: user.role,
        email: user.email,
        profileImage: user.profileImage,
    };
    const token = jwt.sign(payload, secret);
    return token;
}

function validateToken(token) {
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    generateToken,
    validateToken,
}