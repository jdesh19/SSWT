"use client";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  query,
  setDoc,
  getDocs,
  addDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import LogSet from "./LogSet";

export default function LogExercise({ user, loading }) {
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [workoutDocRef, setWorkoutDocRef] = useState(null);

  // This handles creating or finding today's workout doc
  useEffect(() => {
    const setupWorkout = async () => {
      if (!user) return;

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

      let docRef;
      if (!existingWorkouts.empty) {
        docRef = existingWorkouts.docs[0].ref;
      } else {
        docRef = doc(workoutsRef);
        await setDoc(docRef, { date: today });
      }

      setWorkoutDocRef(docRef);

      // Now fetch the exercises
      const exercisesRef = collection(docRef, "exercises");
      const qSnap = await getDocs(exercisesRef);
      const exercisesList = qSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExercises(exercisesList);
    };

    setupWorkout();
  }, [user]);

  const handleLogExercise = async (e) => {
    e.preventDefault();
    if (!workoutDocRef) return;

    const today = new Date().toISOString().split("T")[0];
    const exercisesRef = collection(workoutDocRef, "exercises");
    await addDoc(exercisesRef, {
      name: exerciseName,
      createdAt: today,
      userId: user.uid,
      userEmail: user.email,
    });

    setExerciseName("");

    // Refresh exercises list
    const qSnap = await getDocs(exercisesRef);
    const exercisesList = qSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setExercises(exercisesList);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleLogExercise}>
        <h2 className="text-lg font-semibold mb-2">Log Exercise</h2>

        <input
          className="border px-2 py-1 w-full mb-2"
          type="text"
          placeholder="Exercise name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-1 mt-2 rounded">
          Log Exercise
        </button>
      </form>

      {exercises.map((ex) => (
        <div key={ex.id} className="mb-4 border-b pb-2">
          <div className="flex justify-between items-center">
            <p className="text-md font-medium">{ex.name}</p>
            <button
              onClick={async () => {
                if (workoutDocRef) {
                  const exerciseRef = doc(workoutDocRef, "exercises", ex.id);
                  await deleteDoc(exerciseRef);
                  setExercises((prev) => prev.filter((e) => e.id !== ex.id));
                }
              }}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
          <LogSet user={user} exerciseId={ex.id} />
        </div>
      ))}
    </div>
  );
}
