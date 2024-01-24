const Blog = require("../models/blog");
const Comment = require("../models/comment");

async function handleCreateBlog(req, res) {
  return res.render("addBlog", {
    user: req.user,
  });
}

async function handleBlogPost(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    blogImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`blog/${blog._id}`);
}

// async function createComment(req, res) {

// }

module.exports = {
  handleCreateBlog,
  handleBlogPost,
};
