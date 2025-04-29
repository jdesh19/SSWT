"use client";
import { useAuth } from "@/lib/getAuth";
import { logOut } from "@/lib/auth";
import AuthNav from "../nav/authNav";
import CreateWorkout from "../create/createWorkout";

export default function Auth() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>loading...</p>;
  }

  const handleLogOut = async () => {
    await logOut();
  };

  // const capitalize = (username) => {
  //   const capitalFirstLetter = username.charAt(0).toUpperCase()
  //   const remainderOfDisplayName = username.slice(1).toLowerCase()

  //   return capitalFirstLetter + remainderOfDisplayName
  // }

  return (
    <div className="flex justify-center">
      {user ? (
        <div className="flex">
          <p className="">
            Welcome, {user.displayName}
            <button
              onClick={handleLogOut}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
            >
              Log Out
            </button>
          </p>
          <CreateWorkout />
        </div>
      ) : (
        <>
          <AuthNav />
        </>
      )}
    </div>
  );
}
