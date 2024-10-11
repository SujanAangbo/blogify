const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/uploads/');
    },
    filename: function (req, file, cb) {
        const exts = file.originalname.split(".");
        cb(null, `${Date.now()}${req.user._id}.${exts[1]}`);
    }
});

const upload = multer({ storage: storage })

module.exports = upload;
