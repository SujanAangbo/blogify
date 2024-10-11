const Blog = require("../model/blog_model");

async function handleHomeScreen(req, res) {

    const blogs = await Blog.find();

    return res.render("home", {user : req.user, blogs: blogs});
}


module.exports = {
    handleHomeScreen,
}