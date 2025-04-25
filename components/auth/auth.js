'use client'
import SignupPage from "@/components/auth/signup";
import SignInPage from "@/components/auth/signin";
import { useAuth } from "@/lib/getAuth";
import { logOut } from "@/lib/auth";

export default function Auth() {
  const {user, loading} = useAuth()
  if(loading){
    return<p>loading...</p>
  }

  const handleLogOut = async () => {
    await logOut();
  }

  return (
    <div>
        {user ? <p>welcome, {user.email}</p> : <SignupPage/>}
        <button onClick={handleLogOut} className="bg-red-500 text-white p-2 rounded hover:bg-red-400">Log Out</button>
    </div>
  );
}
