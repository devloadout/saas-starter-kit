"use client";
import { useState } from "react";

export default function UpgradeButton() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  async function go() {
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }
      setMsg(data.error || "Checkout not configured yet.");
    } catch {
      setMsg("Checkout failed.");
    }
    setLoading(false);
  }
  return (
    <div>
      <button onClick={go} disabled={loading} className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold hover:bg-blue-500 disabled:opacity-60">
        {loading ? "…" : "Upgrade — $20/mo"}
      </button>
      {msg && <p className="mt-2 text-sm text-amber-400">{msg}</p>}
    </div>
  );
}
