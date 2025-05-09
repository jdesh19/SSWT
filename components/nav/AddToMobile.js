import Image from "next/image";
export default function AddToMobile() {
  const message = `Press "Share" ➡️ "Add to home page" ➡️ "Add" `;
  return (
    <div>
      <Image
        className="rounded-[30%] border-t-4 border-r-4 border-r-blue-400 border-t-blue-400"
        onClick={() => alert(message)}
        src="/SSWT Logo.png"
        alt="Super Simple Workout Tracker"
        width={200}
        height={200}
      />
    </div>
  );
}
