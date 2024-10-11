const { validateToken } = require("../services/authorization");

function checkUserAuthenticationCookie(req, res, next) {

    const token = req.cookies["token"];

    if (!token) return next();

    try {
        const payload = validateToken(token);
        req.user = payload;
    } catch (e) {}

    return next();

}

module.exports = {
    checkUserAuthenticationCookie,
}