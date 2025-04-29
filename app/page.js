import Auth from "@/components/auth/auth";
import GetWorkout from "@/components/content/workout";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <Image
        className="rounded-[30%] "
          src="/SSWT Logo.png"
          alt="Super Simple Workout Tracker"
          width={200}
          height={200}
        />
      </div>
      <Auth/>
      <GetWorkout/>
    </div>
  );
}
