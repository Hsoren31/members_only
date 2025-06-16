const { Router } = require("express");
const postRouter = Router();
const controller = require("../controllers/postController");

postRouter.get("/new", controller.newMessageGet);
postRouter.post("/new", controller.newMessagePost);
postRouter.get("/", controller.getAllPosts);

module.exports = postRouter;
