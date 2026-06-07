import { useState } from "react";
import type { BlacklistUser } from "../types";

interface BlacklistTableProps {
  users: BlacklistUser[];
  onUnban: (userId: string) => Promise<boolean>;
}

export function BlacklistTable({ users, onUnban }: BlacklistTableProps) {
  const [unbanningId, setUnbanningId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleUnbanClick = (user: BlacklistUser) => {
    if (user.status === "permanent") {
      setConfirmId(user.id);
    } else {
      doUnban(user.id);
    }
  };

  const doUnban = async (id: string) => {
    setUnbanningId(id);
    setConfirmId(null);
    const success = await onUnban(id);
    if (!success) {
      alert("解除限制失败，请稍后重试");
    }
    setUnbanningId(null);
  };

  const statusBadge = (status: BlacklistUser["status"]) => {
    if (status === "permanent") {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
          永久封禁
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
        临时限制
      </span>
    );
  };

  if (users.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border border-ink/10 bg-ink/5 p-8 text-center">
        <p className="text-ink/60">当前没有被限制的用户</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ink/10">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-ink/5">
          <tr>
            <th className="p-3">姓名</th>
            <th className="p-3">用户ID</th>
            <th className="p-3">违约次数</th>
            <th className="p-3">封禁时间</th>
            <th className="p-3">解封时间</th>
            <th className="p-3">状态</th>
            <th className="p-3">操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="border-t border-ink/10" key={user.id}>
              <td className="p-3">
                <div>
                  <div className="font-medium">{user.userName}</div>
                  <div className="text-xs text-ink/60">{user.reason}</div>
                </div>
              </td>
              <td className="p-3 font-mono text-xs">{user.userId}</td>
              <td className="p-3">
                <span className={`font-bold ${user.violationCount >= 5 ? "text-red-600" : "text-amber-600"}`}>
                  {user.violationCount} 次
                </span>
              </td>
              <td className="p-3 text-xs text-ink/70">{user.banTime}</td>
              <td className="p-3 text-xs text-ink/70">{user.unbanTime}</td>
              <td className="p-3">{statusBadge(user.status)}</td>
              <td className="p-3">
                {confirmId === user.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-600">永久封禁确认解除？</span>
                    <button
                      onClick={() => doUnban(user.id)}
                      disabled={unbanningId === user.id}
                      className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      确认
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="rounded-md border border-ink/20 px-3 py-1 text-xs font-semibold hover:bg-ink/5"
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleUnbanClick(user)}
                    disabled={unbanningId === user.id}
                    className="rounded-md bg-accent px-3 py-1 text-xs font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
                  >
                    {unbanningId === user.id ? "处理中..." : "解除限制"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
