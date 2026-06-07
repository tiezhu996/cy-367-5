import { useEffect, useState, useCallback } from "react";
import { fetchOverview, unbanUser } from "./api/client";
import { APP_CODE, APP_NAME } from "./constants/app";
import { REQUEST_MESSAGES } from "./constants/messages";
import { createFallbackOverview } from "./state/dashboard";
import type { OverviewResponse } from "./types";
import { FeatureStrip } from "./components/FeatureStrip";
import { MetricGrid } from "./components/MetricGrid";
import { OperationsTable } from "./components/OperationsTable";
import { BlacklistTable } from "./components/BlacklistTable";

const POLL_INTERVAL = 5000;

export default function App() {
  const [overview, setOverview] = useState<OverviewResponse>(createFallbackOverview());
  const [notice, setNotice] = useState(REQUEST_MESSAGES.overviewFallback);
  const [isOnline, setIsOnline] = useState(false);

  const loadData = useCallback(() => {
    return fetchOverview()
      .then((payload) => {
        setOverview(payload);
        setNotice("后端服务已联通，当前展示实时接口数据。");
        setIsOnline(true);
        return true;
      })
      .catch(() => {
        setNotice(REQUEST_MESSAGES.overviewFallback);
        setIsOnline(false);
        return false;
      });
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleUnban = async (blacklistId: string): Promise<boolean> => {
    try {
      const success = await unbanUser(blacklistId);
      if (success) {
        await loadData();
      }
      return success;
    } catch {
      setOverview((prev) => ({
        ...prev,
        blacklist: prev.blacklist.filter((u) => u.id !== blacklistId),
      }));
      return true;
    }
  };

  return (
    <main className="app-shell text-ink">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-code">{APP_CODE}</span>
          <h1 className="brand-title">{APP_NAME}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${isOnline ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
            <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-green-500" : "bg-amber-500"}`} />
            {isOnline ? "实时同步中" : "本地数据"}
          </span>
          <a className="rounded-md bg-accent px-4 py-2 font-bold text-white" href={REQUEST_MESSAGES.healthPath}>API Health</a>
        </div>
      </header>
      <section className="workspace">
        <div className="lead-grid">
          <article className="hero-panel">
            <span className="pill">{notice}</span>
            <h2 className="mt-5 text-3xl font-black">{overview.appName}</h2>
            <p>{overview.description}</p>
          </article>
          <MetricGrid items={overview.kpis} />
        </div>
        <FeatureStrip items={overview.features} />
        <section className="work-grid">
          <section className="work-panel">
            <h2 className="mb-5 text-2xl font-black">运营任务流</h2>
            <OperationsTable records={overview.records} />
          </section>
          <section className="work-panel">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">黑名单</h2>
              <span className="pill">
                限制中: <strong className="ml-1">{overview.blacklist.length}</strong>
              </span>
            </div>
            <BlacklistTable users={overview.blacklist} onUnban={handleUnban} />
          </section>
        </section>
      </section>
    </main>
  );
}
