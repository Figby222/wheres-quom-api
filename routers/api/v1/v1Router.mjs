import { Router } from "express";
import * as indexController from "../../../controllers/api/v1/indexController.mjs";

const indexRouter = Router();


indexRouter.get("/", indexController.indexRouteGet);


export default indexRouter;