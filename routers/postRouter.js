const { Router } = require("express");
const postRouter = Router();
const controller = require("../controllers/postController");

postRouter.get("/new", controller.newMessageGet);
postRouter.post("/new", controller.newMessagePost);
postRouter.post("/:id/delete", controller.deletePost);
postRouter.get("/", controller.getAllPosts);

module.exports = postRouter;
