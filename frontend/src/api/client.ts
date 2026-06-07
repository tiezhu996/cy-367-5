import { API_BASE_URL } from "../constants/app";
import type { OverviewResponse } from "../types";

export async function fetchOverview(): Promise<OverviewResponse> {
  const response = await fetch(`${API_BASE_URL}/overview`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Overview request failed: ${response.status}`);
  }

  return response.json() as Promise<OverviewResponse>;
}

export async function unbanUser(blacklistId: string): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/blacklist/${blacklistId}/unban`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Unban request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.success === true;
}
