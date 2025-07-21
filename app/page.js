"use client";
import Auth from "@/components/auth/auth";
import LogExercise from "@/components/create/LogExercise";
import AddToMobile from "@/components/nav/AddToMobile";
import { useAuth } from "@/lib/getAuth";

export default function Home() {
  const { user, loading } = useAuth();
  return (
    <div className="min-h-screen flex justify-center flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        <AddToMobile />
        
        <div className="flex justify-center">
          <div className="glass-card p-8 w-full max-w-md">
            <Auth user={user} loading={loading} />
          </div>
        </div>

        {user && (
          <div className="glass-card p-6 w-full animate-slide-up">
            <LogExercise user={user} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}
