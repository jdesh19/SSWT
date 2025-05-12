"use client";
import Auth from "@/components/auth/auth";
import LogExercise from "@/components/create/LogExercise";
import AddToMobile from "@/components/nav/AddToMobile";
import { useAuth } from "@/lib/getAuth";

export default function Home() {
  const { user, loading } = useAuth();
  return (
    <div className="flex justify-center flex-col items-center">
      <AddToMobile />
      <div>
        <Auth user={user} loading={loading} />
      </div>

      {user ? <LogExercise user={user} loading={loading} /> : <></>}
    </div>
  );
}
