const {Router} = require("express");
const UserController = require("../controller/user_controller");
const upload = require("../services/upload_profile_image");

const router = Router();

router.get("/signup", (req, res) => {return res.render("signup")});
router.get("/login", (req, res) => {return res.render("login")});

router.post("/signup", upload.single("profileImage"), UserController.handleUserSignup);
router.post("/login", UserController.handleUserLogin);

router.get("/logout", UserController.handleUserLogout);

module.exports = router;