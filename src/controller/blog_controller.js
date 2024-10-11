const Blog = require("../model/blog_model");
const Comment = require("../model/comment_model");

async function handleCreateBlog(req, res) {

    const body = req.body;

    try {

        await Blog.create({ title: body.title, description: body.description, coverImage: `/uploads/${req.file.filename}`, author: req.user._id });

        return res.redirect("/");

    } catch (e) {

        return res.render("create_blog", { error: e.message });

    }

}

async function handleGetBlogDetail(req, res) {
    const blogId = req.params.id;

    const foundBlog = await Blog.findById({ _id: blogId }).populate("author");
    const comments = await Comment.find({blog: blogId}).populate("author");


    if (!foundBlog) return res.render("blog-detail", { error: "Unable to fetch data!" });

    console.log("comment: ", comments);

    return res.render("blog-detail", { blog: foundBlog, comments, user: req.user});

}

async function handleCreateBlogComment(req, res) {

    const blogId = req.params.blogId;
    const body = req.body;

    await Comment.create({ content: body.content, author: req.user._id, blog: blogId });

    return res.redirect(`/blog/${blogId}`);


}

module.exports = {
    handleCreateBlog,
    handleGetBlogDetail,
    handleCreateBlogComment,
}