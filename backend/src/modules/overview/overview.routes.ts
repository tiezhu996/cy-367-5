import { Router } from "express";
import { getOverview, unbanUser } from "./overview.controller";

export const overviewRouter = Router();

overviewRouter.get("/overview", getOverview);
overviewRouter.post("/blacklist/:id/unban", unbanUser);
