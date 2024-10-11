require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const {checkUserAuthenticationCookie} = require("./middlewares/check_user");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./src/public")));

// user middlewares
app.use(checkUserAuthenticationCookie)

app.set("view engine", "ejs");
app.set("views", "./src/views");

// routes
const userRoute = require("./routes/user_route");
app.use("/user/", userRoute);

const blogRoute = require("./routes/blog_route");
app.use("/blog/", blogRoute);

const staticRoute = require("./routes/static_route");
app.use("/", staticRoute);

// database
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to database"));

app.listen(process.env.PORT, () => console.log("Server started"));