import type { Request, Response } from "express";
import { OverviewService } from "./overview.service";

const service = new OverviewService();

export function getOverview(_request: Request, response: Response) {
  response.json(service.getOverview());
}

export function unbanUser(request: Request, response: Response) {
  const { id } = request.params;
  if (!id || typeof id !== "string") {
    response.status(400).json({ success: false, error: "缺少黑名单ID" });
    return;
  }
  const success = service.unbanUser(id);
  response.json({ success });
}
