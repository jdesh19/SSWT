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
import { CiSquareRemove } from "react-icons/ci";

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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-light mb-6">Today's Workout</h2>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-light mb-4">Add Exercise</h3>
        <form className="flex flex-col sm:flex-row items-stretch gap-2 p-4 rounded-2xl bg-gradient-to-r " onSubmit={handleLogExercise}>
          <input
            className="input-glass flex-1 px-4 py-3 rounded-lg placeholder-white/60"
            type="text"
            placeholder="Exercise name (e.g., Bench Press, Squats)"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
          >
            Add Exercise
          </button>
        </form>
      </div>

      {exercises.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-light text-center">Your Exercises</h3>
          {exercises.map((ex) => (
            <div key={ex.id} className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-light">{ex.name}</h4>
                <button
                  onClick={async () => {
                    if (workoutDocRef) {
                      const exerciseRef = doc(workoutDocRef, "exercises", ex.id);
                      await deleteDoc(exerciseRef);
                      setExercises((prev) => prev.filter((e) => e.id !== ex.id));
                    }
                  }}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  title="Remove exercise"
                >
                  <CiSquareRemove className="text-2xl" />
                </button>
              </div>
              <LogSet user={user} exerciseId={ex.id} />
            </div>
          ))}
        </div>
      )}
      
      {exercises.length === 0 && (
        <div className="text-center py-8">
          <p className="text-light-secondary text-lg">No exercises added yet. Start by adding your first exercise above!</p>
        </div>
      )}
    </div>
  );
}
