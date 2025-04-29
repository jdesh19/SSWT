"use client";
import Auth from "@/components/auth/auth";
import OneDaySelector from "@/components/content/workout";
import Image from "next/image";

export default function Home() {
  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
  };
  return (
    <div>
      <div className="grid justify-center">
        <Image
          className="rounded-[30%] "
          src="/SSWT Logo.png"
          alt="Super Simple Workout Tracker"
          width={200}
          height={200}
        />
        <div>
          <Auth />
        </div>
      </div>

      <div>
        <OneDaySelector onDateSelect={handleDateSelect} />
      </div>
    </div>
  );
}
