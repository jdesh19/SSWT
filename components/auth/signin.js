"use client";
import { useState } from "react";
import { logIn } from "@/lib/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
      setEmail("");
      setPassword("");
      setErrorMsg("");
      alert("Sign in successful!");
      // you could redirect the user here using next/router or next/navigation
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
        <input
          className="bg-gray-200 p-2 rounded"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="bg-gray-200 p-2 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="btn-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          Sign In
        </button>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      </form>
    </div>
  );
}
