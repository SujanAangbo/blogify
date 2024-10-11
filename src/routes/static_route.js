const {Router} = require("express");
const { handleHomeScreen } = require("../controller/static_controller");

const router = Router();

router.get("/", handleHomeScreen);

module.exports = router;