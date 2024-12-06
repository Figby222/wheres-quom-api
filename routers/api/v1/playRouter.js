const { Router } = require("express");
const playController = require("../../../controllers/api/v1/playController.mjs");

const playRouter = Router();


playRouter.post("/", playController.createGamePost);
playRouter.put("/", playController.changeGameStatePut);


module.exports = playRouter;