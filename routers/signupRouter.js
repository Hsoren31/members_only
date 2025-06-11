const { Router } = require("express");
const signupRouter = Router();
const controller = require("../controllers/signupController");
signupRouter.get("/", (req, res) => {
  res.render("signup");
});

signupRouter.post("/", controller.createUserPost);

module.exports = signupRouter;
