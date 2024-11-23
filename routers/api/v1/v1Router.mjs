import { Router } from "express";
import * as indexController from "../../../controllers/api/v1/indexController.mjs";
import playRouter from "./playRouter.mjs";

const indexRouter = Router();

indexRouter.use("/play", playRouter);

indexRouter.get("/", indexController.indexRouteGet);

export default indexRouter;