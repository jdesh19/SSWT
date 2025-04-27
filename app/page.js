import Auth from "@/components/auth/auth";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Auth/>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src="/SSWT.png"
          alt="Super Simple Workout Tracker"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
