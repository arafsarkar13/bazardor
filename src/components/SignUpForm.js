"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    setLoading(false);

    if (signUpError) {
      const message = signUpError.message || "";
      if (message.toLowerCase().includes("exist")) {
        setError("এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।");
      } else {
        setError(message || "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
      }
      return;
    }

    // Success: go to the sign in page
    router.push("/signin");
  }

  return (
    <div className="card bg-base-100 border border-base-300">
      <form onSubmit={handleSubmit} className="card-body gap-4">
        <h1 className="text-2xl font-bold">সাইন আপ</h1>
        <p className="text-sm text-base-content/60">
          নতুন অ্যাকাউন্ট খুলুন এবং পণ্যের বিস্তারিত দাম দেখুন।
        </p>

        {error && (
          <div role="alert" className="alert alert-error alert-soft text-sm">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-semibold">
            নাম
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="আপনার নাম"
            autoComplete="name"
            className="input w-full"
          />
        </div>

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
            placeholder="কমপক্ষে ৮ অক্ষর"
            autoComplete="new-password"
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
          সাইন আপ করুন
        </button>

        <p className="text-sm text-center">
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="link link-primary font-semibold">
            সাইন ইন করুন
          </Link>
        </p>
      </form>
    </div>
  );
}
