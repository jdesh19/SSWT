"use client";
import { db } from "@/lib/firebase";
import { collection, doc, query, setDoc, getDocs, addDoc, where } from "firebase/firestore";
import { useState } from "react";

export default function LogExercise({ user, loading }) {
  const [exerciseName, setExerciseName] = useState("");

  const handleLogExercise = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
      },
      { merge: true }
    );

    const today = new Date().toISOString().split("T")[0];

    const workoutsRef = collection(userRef, "workouts");
    const q = query(workoutsRef, where("date", "==", today));
    const existingWorkouts = await getDocs(q);

    let workoutDocRef;

    if (!existingWorkouts.empty) {
      workoutDocRef = existingWorkouts.docs[0].ref;
    } else {
      workoutDocRef = doc(workoutsRef);
      await setDoc(workoutDocRef, {
        date: today,
      });
    }

    // Add exercise to this workout
    const exercisesRef = collection(workoutDocRef, "exercises");
    await addDoc(exercisesRef, {
      name: exerciseName,
      createdAt: today,
      userId: user.uid,
      userEmail: user.email,
    });

    setExerciseName("");
  };

  return (
    <form className="p-4" onSubmit={handleLogExercise}>
      <h2 className="text-lg font-semibold mb-2">Log Exercise</h2>

      <input
        className="border px-2 py-1 w-full mb-2"
        type="text"
        placeholder="Exercise name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />

      {/* add sets
      <div className="flex gap-2 mb-1">
        <input
          type="number"
          placeholder="Reps"
          className="border px-2 py-1 w-1/4"
        />
        <input
          type="number"
          placeholder="Weight"
          className="border px-2 py-1 w-1/4"
        />
        <input
          type="text"
          placeholder="Notes"
          className="border px-2 py-1 w-1/2"
        />
      </div> */}

      <button className="bg-blue-600 text-white px-4 py-1 mt-2 rounded">
        Log Exercise
      </button>
    </form>
  );
}
