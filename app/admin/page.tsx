"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0A1A42 0%, #0F2557 55%, #162B6E 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo + branding */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl">
            <Image
              src="/logo/logo.jpeg"
              alt="RMI Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Renewed Minds International
          </h1>
          <p className="text-yellow-400 text-sm font-medium mt-1">
            Admin Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-[#0F2557] px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <ShieldCheck size={22} className="text-[#0F2557]" />
              </div>
              <div>
                <h2 className="text-white font-heading font-bold text-lg">
                  Secure Login
                </h2>
                <p className="text-blue-200/60 text-xs">
                  Administrator access only
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2557] focus:border-transparent text-gray-800 transition-all"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPw(!showPw)}
                  aria-label="Toggle password visibility"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="text-red-500">⚠</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#0F2557] hover:bg-[#0A1A42] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Login to Dashboard
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <a
                href="/"
                className="text-sm text-gray-400 hover:text-[#0F2557] transition-colors"
              >
                ← Back to main site
              </a>
            </div>
          </form>
        </div>

        <p className="text-center text-blue-200/40 text-xs mt-6">
          Renewed Minds International © {new Date().getFullYear()}. Secure admin access.
        </p>
      </div>
    </div>
  );
}
