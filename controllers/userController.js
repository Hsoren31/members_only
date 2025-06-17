const db = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

const validateMember = [
  body("secretCode")
    .custom((value) => {
      return value === "scuttle bones";
    })
    .withMessage("Sorry that's not it."),
];

const validateAdmin = [
  body("secretCode")
    .custom((value) => {
      return value === "Schooner";
    })
    .withMessage("Sorry that's not it."),
];

exports.joinUserGet = async (req, res) => {
  res.render("joinTheClub");
};

exports.joinUserPost = [
  validateMember,
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

exports.adminGet = async (req, res) => {
  res.render("admin");
};

exports.adminPost = [
  validateAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("admin", {
        errors: errors.array(),
      });
    }
    await db.giveAdminStatus(req.user);
    res.render("success", { message: "You now have Admin properties." });
  },
];
