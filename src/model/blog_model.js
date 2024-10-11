const {Schema, model} = require("mongoose");

const blogSchema = Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    coverImage: {type: String},
    author: {type: Schema.Types.ObjectId, ref: "user", required: true}
}, {
    timestamps: true,
    collection: "blog"
});

const Blog = model("blog", blogSchema);

module.exports = Blog;