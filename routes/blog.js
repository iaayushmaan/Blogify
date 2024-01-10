const { Router } = require("express");
const {
  handleCreateBlog,
  handleBlogPost,
  createComment,
} = require("../controllers/blog");
const router = Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), handleBlogPost);
router.get("/add-new", handleCreateBlog);

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comment = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  //console.log(comment);
  //console.log("blog", blog);
  return res.render("blog", {
    user: req.user,
    blog,
    comment,
  });
});

router.post("/comment/:id", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.id,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.id}`);
});

module.exports = router;
