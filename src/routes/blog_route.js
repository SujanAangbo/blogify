const {Router} = require("express");
const upload = require("../services/upload_blog_image");

const { handleCreateBlog, handleGetBlogDetail, handleCreateBlogComment } = require("../controller/blog_controller");

const router = Router();

router.get("/create-blog", (req, res) => {return res.render("create_blog", {user: req.user})});
router.post("/", upload.single("coverImage"), handleCreateBlog);

router.get("/:id", handleGetBlogDetail);

router.post("/comment/:blogId", handleCreateBlogComment);

module.exports = router;