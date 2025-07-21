import Image from "next/image";
export default function AddToMobile() {
  const message = `Press "Share" ➡️ "Add to home page" ➡️ "Add" `;
  return (
    <>
      <div className="text-center space-y-6">
        <Image
          className="rounded-2xl mx-auto cursor-pointer transition-transform duration-300 hover:scale-110 shadow-2xl"
          onClick={() => alert(message)}
          src="/sswtLogo.png"
          alt="Super Simple Workout Tracker"
          width={120}
          height={120}
        />
        <div>
          <h1 className="text-center mb-6 text-3xl font-extrabold text-light md:text-5xl lg:text-6xl leading-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 block mt-2">
              Super Simple Workout Tracker
            </span>
          </h1>
          <p className="text-light-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Track your fitness journey with style and simplicity
          </p>
        </div>
      </div>
    </>
  );
}
