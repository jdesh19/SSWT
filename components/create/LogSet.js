"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function LogSet({ exerciseId, user }) {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [sets, setSets] = useState([]);

  // Fetch sets for this exercise
  const fetchSets = async () => {
    const today = new Date().toISOString().split("T")[0];
    const workoutsRef = collection(db, "users", user.uid, "workouts");
    const workoutQuery = query(workoutsRef, where("date", "==", today));
    const workoutSnap = await getDocs(workoutQuery);

    if (workoutSnap.empty) return;

    const workoutRef = workoutSnap.docs[0].ref;
    const setsRef = collection(
      doc(collection(workoutRef, "exercises"), exerciseId),
      "sets"
    );
    const setSnap = await getDocs(setsRef);
    const setList = setSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSets(setList);
  };

  useEffect(() => {
    fetchSets();
  }, [exerciseId]);

  const handleAddSet = async (e) => {
    e.preventDefault();

    if (!reps || !weight || !user) return;

    setLoading(true);

    const today = new Date().toISOString().split("T")[0];
    const workoutsRef = collection(db, "users", user.uid, "workouts");
    const workoutQuery = query(workoutsRef, where("date", "==", today));
    const workoutSnap = await getDocs(workoutQuery);

    if (workoutSnap.empty) {
      console.error("Workout not found for today.");
      setLoading(false);
      return;
    }

    const workoutRef = workoutSnap.docs[0].ref;
    const setRef = collection(
      doc(collection(workoutRef, "exercises"), exerciseId),
      "sets"
    );

    await addDoc(setRef, {
      reps: parseInt(reps),
      weight: parseFloat(weight),
      createdAt: Timestamp.now(),
    });

    setReps("");
    setWeight("");
    await fetchSets();
    setLoading(false);
  };

  return (
    <div className="mt-2">
      <form onSubmit={handleAddSet} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="number"
            className="border px-2 py-1 w-20"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <input
            type="number"
            className="border px-2 py-1 w-24"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Set"}
          </button>
        </div>
      </form>

      {sets.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-1">Logged Sets:</h4>
          <ul className="text-sm space-y-1">
          {sets.map((set) => (
  <li key={set.id} className="flex justify-between items-center">
    <span>
      💪 Reps: {set.reps} 🏋️ Weight: {set.weight} lbs
    </span>
    <button
      onClick={async () => {
        const today = new Date().toISOString().split("T")[0];
        const workoutsRef = collection(db, "users", user.uid, "workouts");
        const workoutQuery = query(workoutsRef, where("date", "==", today));
        const workoutSnap = await getDocs(workoutQuery);

        if (!workoutSnap.empty) {
          const workoutRef = workoutSnap.docs[0].ref;
          const setDocRef = doc(
            collection(doc(collection(workoutRef, "exercises"), exerciseId), "sets"),
            set.id
          );
          await deleteDoc(setDocRef);
          setSets((prev) => prev.filter((s) => s.id !== set.id));
        }
      }}
      className="text-red-500 text-xs ml-2"
    >
      <IoIosRemoveCircleOutline className="text-lg"/>
    </button>
  </li>
))}

          </ul>
        </div>
      )}
    </div>
  );
}
