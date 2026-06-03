"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-100">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-bold">
          <span className="rounded-md bg-blue-600 px-2 py-1 font-mono text-sm">{"</>"}</span> SaaS Starter Kit
        </Link>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
          <h1 className="mb-6 text-2xl font-bold">{isSignup ? "Create your account" : "Welcome back"}</h1>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-neutral-400">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 outline-none focus:border-blue-500" placeholder="you@email.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-neutral-400">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 outline-none focus:border-blue-500" placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button disabled={loading} className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold hover:bg-blue-500 disabled:opacity-60">
              {loading ? "…" : isSignup ? "Sign up" : "Log in"}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-neutral-400">
            {isSignup ? "Already have an account? " : "No account yet? "}
            <Link href={isSignup ? "/login" : "/signup"} className="text-blue-400 hover:underline">
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
