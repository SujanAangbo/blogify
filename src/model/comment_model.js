const {Schema, model} = require("mongoose");

const commentSchema = Schema({
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: "user", required: true},
    blog: {type: Schema.Types.ObjectId, ref: "blog", required: true}
}, {timestamps: true, collection: "comment"});


const Comment = model("comment", commentSchema);

module.exports = Comment;