"use client";
import Auth from "@/components/auth/auth";
import LogExercise from "@/components/create/LogExercise";
import { useAuth } from "@/lib/getAuth";
import Image from "next/image";

export default function Home() {
  const { user, loading } = useAuth();
  return (
    <div>
      <div className="grid items-center justify-center">
        <Image
          className="rounded-[30%] "
          src="/SSWT Logo.png"
          alt="Super Simple Workout Tracker"
          width={200}
          height={200}
        />
        <div>
          <Auth user={user} loading={loading} />
        </div>
      </div>
      {user ? <LogExercise user={user} loading={loading} /> : <p></p>}
    </div>
  );
}
