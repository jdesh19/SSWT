"use client";

import { useState } from "react";
import SignInPage from "../auth/signin";
import SignupPage from "../auth/signup";
import Modal from "./modal";


export default function AuthNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authType, setAuthType] = useState("");

  const openSignIn = () => {
    setAuthType("signin");
    setIsModalOpen(true);
  };

  const openSignUp = () => {
    setAuthType("signup");
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center p-5">
      <button onClick={openSignIn} className="bg-blue-500 text-white p-2 rounded m-2">
        Sign In
      </button>
      <button onClick={openSignUp} className="bg-green-500 text-white p-2 rounded m-2">
        Sign Up
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {authType === "signin" ? <SignInPage /> : <SignupPage />}
      </Modal>
    </div>
  );
}
