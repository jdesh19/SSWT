import Image from "next/image";
export default function AddToMobile() {
  const message = `Press "Share" ➡️ "Add to home page" ➡️ "Add" `;
  return (
    <>
      <Image
        className="rounded-[10%] m-5"
        onClick={() => alert(message)}
        src="/sswtLogo.png"
        alt="Super Simple Workout Tracker"
        width={100}
        height={100}
      />
      <div>
        <h1 className="grid text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"> Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Super Simple Workout Tracker</span></h1>
      </div>
    </>
  );
}
