const { Router } = require("express");
const memberRouter = Router();
const memberController = require("../controllers/memberController");

memberRouter.get("/join", memberController.joinUserGet);
memberRouter.post("/join", memberController.joinUserPost);

module.exports = memberRouter;
