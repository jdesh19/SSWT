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
    <div className="mt-4 space-y-4">
      <div className="glass-card p-4">
        <h4 className="text-light font-medium mb-3">Add New Set</h4>
        <form onSubmit={handleAddSet} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              className="input-glass w-full px-4 py-2 rounded-lg"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              className="input-glass w-full px-4 py-2 rounded-lg"
              placeholder="Weight (lbs)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : 'Add Set'}
          </button>
        </form>
      </div>

      {sets.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-light font-medium">Logged Sets</h4>
          <div className="space-y-2">
            {sets.map((set, index) => (
              <div key={set.id} className="glass-card p-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-light font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-light font-medium">{set.reps} reps</p>
                    <p className="text-light-secondary text-sm">{set.weight} lbs</p>
                  </div>
                </div>
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
                  className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1"
                  title="Delete set"
                >
                  <IoIosRemoveCircleOutline className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
