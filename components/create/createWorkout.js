'use client'
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useState } from "react";

export default  function CreateWorkout() {
  const [workoutName, setWorkoutName] = useState("")

  const user = auth.currentUser;
  const userDocRef = doc(db, 'users', user.uid);
  const workoutsRef = collection(db, 'users', user.uid, 'workouts');

  if (!user) throw new Error("User not logged in");

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    await setDoc(userDocRef, {
      username: user.displayName || "",
      date_joined: user.metadata?.creationTime || new Date(),
      email: user.email || "",
    });

    const newWorkout = await addDoc(workoutsRef, {
      name: workoutName,
      createdAt: new Date(),
    });
    console.log("Workout created:", newWorkout.id);
  }

  return (
    <div>
      <form onSubmit={handleCreateWorkout} className="flex flex-col gap-4">
        <input
          className="bg-gray-200 p-2 rounded"
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder="Workout Name"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          type="submit"
        >
          Create Workout
        </button>
      </form>
    </div>
  )

}
