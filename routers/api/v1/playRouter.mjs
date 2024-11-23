import { Router } from "express";
import * as playController from "../../../controllers/api/v1/playController.mjs";

const playRouter = Router();


playRouter.post("/", playController.createGamePost);


export default playRouter;