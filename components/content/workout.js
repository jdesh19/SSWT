"use client";

import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function OneDaySelector({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [canGoBack, setCanGoBack] = useState(false);

  const user = auth.currentUser;
  const workoutsRef = collection(db, "users", user.uid, "workouts");

  // Format date for Firestore doc naming or filtering
  const getDateKey = (date) => format(date, "yyyy-MM-dd");

  const checkWorkoutExists = async (date) => {
    const q = query(workoutsRef, where("date", "==", getDateKey(date)));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const createWorkoutIfNeeded = async (date) => {
    const exists = await checkWorkoutExists(date);
    if (!exists) {
      const newWorkoutRef = doc(workoutsRef); // auto-generated ID
      await setDoc(newWorkoutRef, {
        date: getDateKey(date),
        exercises: [],
        createdAt: new Date(),
      });
    }
  };

  const handlePrev = async () => {
    const prevDate = subDays(selectedDate, 1);
    const exists = await checkWorkoutExists(prevDate);
    if (exists) {
      setSelectedDate(prevDate);
      onDateSelect(prevDate);
    }
  };

  const handleNext = async () => {
    const nextDate = addDays(selectedDate, 1);
    await createWorkoutIfNeeded(nextDate);
    setSelectedDate(nextDate);
    onDateSelect(nextDate);
  };

  useEffect(() => {
    const updateCanGoBack = async () => {
      const prevDate = subDays(selectedDate, 1);
      const exists = await checkWorkoutExists(prevDate);
      setCanGoBack(exists);
    };
    updateCanGoBack();
  }, [selectedDate]);

  return (
    <>
      <h1 className="text-xl font-bold mb-2 grid justify-center">Daily Log:</h1>
      <div className="flex items-center justify-center gap-4">
        {canGoBack && (
          <button onClick={handlePrev} className="text-lg font-bold">
            ⬅️
          </button>
        )}
        <div className="text-md font-medium">{format(selectedDate, "PPP")}</div>
        <button onClick={handleNext} className="text-lg font-bold">
          ➡️
        </button>
      </div>
    </>
  );
}
