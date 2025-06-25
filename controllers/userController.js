const db = require("../db/queries.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const emptyErr = "cannot be empty";
const alphaErr = "must only contain letters.";
const nameLengthErr = "must be between 1 and 12 characters";
const loginLengthErr = "must between 8 and 15 characters";

const validateUser = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage(`First name ${emptyErr}`)
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 12 })
    .withMessage(`First name ${nameLengthErr}`),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${emptyErr}`)
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 12 })
    .withMessage(`Last name ${nameLengthErr}`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .isLength({ min: 8, max: 15 })
    .withMessage(`Username ${loginLengthErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .isLength({ min: 8, max: 15 })
    .withMessage(`Password ${loginLengthErr}`),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords do not match`),
];

const validateMember = [
  body("secretCode")
    .custom((value) => {
      return value === process.env.MEMBERPASSWORD;
    })
    .withMessage("Sorry that's not it."),
];

const validateAdmin = [
  body("secretCode")
    .custom((value) => {
      return value === process.env.ADMINPASSWORD;
    })
    .withMessage("Sorry that's not it."),
];

exports.signUpGet = (req, res) => {
  res.render("signup");
};

exports.signUpPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { firstname, lastname, username } = req.body;
    await db.insertUser(firstname, lastname, username, hashedPassword);
    res.redirect("/");
  },
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
