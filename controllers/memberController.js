const db = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

const validatePassword = [
  body("secretCode")
    .custom((value) => {
      return value === "scuttled bones";
    })
    .withMessage("Sorry that's not it."),
];

exports.joinUserGet = async (req, res) => {
  res.render("joinTheClub");
};

exports.joinUserPost = [
  validatePassword,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("joinTheClub", {
        errors: errors.array(),
      });
    }
    await db.userToMember(req.user);
    res.render("success", { message: "You successfully joined the club!" });
  },
];
