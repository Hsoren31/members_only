const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/sign-up", userController.signUpGet);
userRouter.post("/sign-up", userController.signUpPost);

userRouter.get("/members/join", userController.memberGet);
userRouter.post("/members/join", userController.memberPost);

userRouter.get("/admin", userController.adminGet);
userRouter.post("/admin", userController.adminPost);

module.exports = userRouter;
