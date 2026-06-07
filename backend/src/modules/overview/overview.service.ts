import { overviewData, removeFromBlacklist } from "./overview.data";

export class OverviewService {
  getOverview() {
    return overviewData;
  }

  unbanUser(id: string): boolean {
    return removeFromBlacklist(id);
  }
}
