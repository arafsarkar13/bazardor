"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
      return;
    }

    // Success: go to Home and refresh so the page knows we are logged in
    router.push("/");
    router.refresh();
  }

  return (
    <div className="card bg-base-100 border border-base-300">
      <form onSubmit={handleSubmit} className="card-body gap-4">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="text-sm text-base-content/60">
          আপনার অ্যাকাউন্টে ঢুকে পণ্যের বিস্তারিত দাম দেখুন।
        </p>

        {error && (
          <div role="alert" className="alert alert-error alert-soft text-sm">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-semibold">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="input w-full"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-semibold">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="আপনার পাসওয়ার্ড"
            autoComplete="current-password"
            className="input w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          সাইন ইন
        </button>

        <p className="text-sm text-center">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="link link-primary font-semibold">
            সাইন আপ করুন
          </Link>
        </p>
      </form>
    </div>
  );
}
