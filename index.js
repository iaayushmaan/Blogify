const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connections");
const { checkForAuthentication } = require("./middlewares/auth");
const Blog = require("./models/blog");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/blogify").then((err) =>
  console.log("MongoDB connected successfully")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public"))); //public folder me jo bhi hai use statically serve krdo {ejs me kaam aya home page me}

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
