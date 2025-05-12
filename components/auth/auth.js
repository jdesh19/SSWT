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
        <div className="grid my-5">
          <p className=""><span className="text-lg">Welcome</span>, <span className="font-bold">{user.displayName}</span></p>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <ImageCarousel/>
          <AuthNav />
        </div>
      )}
    </div>
  );
}
