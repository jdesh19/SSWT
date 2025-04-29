"use client";

import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/lib/getAuth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function GetWorkout() {
  const [workouts, setWorkouts] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    async function fetchWorkouts() {
      if (!user) {
        console.log("No user found.");
        return;
      }

      const workoutsRef = collection(db, "users", user.uid, "workouts");
      const snapshot = await getDocs(workoutsRef);

      const workoutsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Workouts:", workoutsList);
      setWorkouts(workoutsList);
    }

    if (!loading && user) {
      fetchWorkouts();
    }
  }, [loading, user]);  // ✅ Start with this always in place

  return (
    <div>
      <h1>User's Workouts</h1>
      {loading ? (
        <p>Loading workouts...</p>
      ) : workouts.length > 0 ? (
        <ul className="space-y-2">
          {workouts.map((workout) => (
            <li key={workout.id} className="bg-gray-200 p-2 rounded">
              <strong>{workout.name}</strong>
              <br />
              {workout.createdAt?.toDate
                ? workout.createdAt.toDate().toLocaleString()
                : "No date"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
}
