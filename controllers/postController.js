const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const emptyErr = "cannot be empty";
const lengthErr = "must be less than 255 characters";

const validatePost = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage(`Message ${emptyErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Message ${lengthErr}`),
];

exports.newMessageGet = (req, res) => {
  res.render("messageForm");
};

exports.newMessagePost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("messageForm", {
        errors: errors.array(),
      });
    }
    const { message } = req.body;
    await db.insertPost(message, req.user.id);
    res.redirect("/");
  },
];

exports.deletePost = async (req, res) => {
  await db.deletePost(req.params.id);
  res.redirect("/posts");
};

exports.getAllPosts = async (req, res) => {
  const posts = await db.getAllPosts();
  res.render("posts.ejs", { posts: posts });
};
