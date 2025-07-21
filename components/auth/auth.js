"use client";
import { logOut } from "@/lib/auth";
import AuthNav from "../nav/authNav";
import ImageCarousel from "../ImageCarousel";
export default function Auth({user, loading}) {

 
console.log(user)
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
        <div className="text-center space-y-4">
          <p className="text-light text-lg">
            <span className="font-bold text-xl">Hello</span>,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
              {user.displayName}
            </span>
          </p>
          <button
            onClick={handleLogOut}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <ImageCarousel/>
          <AuthNav />
        </div>
      )}
    </div>
  );
}
