"use client";
import { useAuth } from "@/lib/getAuth";
import { logOut } from "@/lib/auth";
import AuthNav from "../nav/authNav";

export default function Auth() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>loading...</p>;
  }

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <div className="flex justify-center">
      {user ? (
        
          <p>
            welcome, {user.displayName}{" "}
            <button
              onClick={handleLogOut}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
            >
              Log Out
            </button>
          </p>
      ) : (
        <>
          <AuthNav />
        </>
      )}
    </div>
  );
}
