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
    <div className="flex justify-center gap-4 p-6">
      <button 
        onClick={openSignIn} 
        className="btn-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
      >
        Sign In
      </button>
      <button 
        onClick={openSignUp} 
        className="btn-secondary px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
      >
        Sign Up
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {authType === "signin" ? <SignInPage /> : <SignupPage />}
      </Modal>
    </div>
  );
}
