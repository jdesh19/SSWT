"use client";
import { useState } from "react";
import { signUp } from "@/lib/auth";
import { updateProfile } from "firebase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMsg("Must use a valid email");
    } else if (password.trim().length <= 7 || password.trim().length > 20) {
      setErrorMsg(
        "Password must be longer than 7 and shorter than 20 characters"
      );
    } else {
      try {
        const userCredential = await signUp(email, password); // Create the user first
        const user = userCredential.user; // Get the Firebase user object

        await updateProfile(user, {
          displayName: username
        })

        console.log("User signed up and Firestore document created.");
        setEmail("");
        setPassword("");
        setUsername("");
        setErrorMsg("");
        alert("Signup successful!");
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          className="bg-gray-200 p-2 rounded"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
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
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <p className="text-red-500">{errorMsg}</p>
    </div>
  );
}
