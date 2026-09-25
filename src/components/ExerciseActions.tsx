"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

interface ExerciseActionsProps {
  exercise: {
    id: number;
    name: string;
    image: string;
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
  };
}

const ExerciseActions = ({ exercise }: ExerciseActionsProps) => {
  const { addToPlan, isInPlan, saveExercise, isSaved } = usePlan();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const handleAddToPlan = () => {
    if (isInPlan(exercise.id)) {
      showToast("Already in your plan", "error");
      return;
    }

    addToPlan({
      id: exercise.id,
      name: exercise.name,
      image: exercise.image,
      equipment: exercise.equipment,
      duration: exercise.duration,
      caloriesBurned: exercise.caloriesBurned,
      rating: exercise.rating,
    });

    showToast("Added to Today's Plan", "success");
  };

  const handleSave = () => {
    if (isSaved(exercise.id)) {
      showToast("Already saved", "error");
      return;
    }

    saveExercise({
      id: exercise.id,
      name: exercise.name,
      image: exercise.image,
      equipment: exercise.equipment,
      duration: exercise.duration,
      caloriesBurned: exercise.caloriesBurned,
      rating: exercise.rating,
    });

    showToast("Saved for Later", "success");
  };

  return (
    <>
      <div className="mt-7 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleAddToPlan}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#b7ff00] px-4 py-3 text-xs font-black uppercase text-black transition hover:bg-[#c8ff33] active:scale-[0.98]"
        >
          <span className="text-base">＋</span>
          {isInPlan(exercise.id)
            ? "Added to Today's Plan"
            : "Add to Today's Plan"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center justify-center gap-2 rounded-xl border border-[#b7ff00] bg-transparent px-4 py-3 text-xs font-black uppercase text-[#b7ff00] transition hover:bg-[#b7ff00] hover:text-black"
        >
          <span className="text-base">{isSaved(exercise.id) ? "♥" : "♡"}</span>

          {isSaved(exercise.id) ? "Saved" : "Save for Later"}
        </button>
      </div>

      {toastMessage && (
        <div className="fixed right-6 top-4 z-[100] rounded-xl border border-[#b7ff00] bg-[#15171b] px-5 py-3 shadow-lg">
          <p className="text-sm font-bold text-white">
            <span
              className={
                toastType === "success" ? "text-[#b7ff00]" : "text-red-500"
              }
            >
              {toastType === "success" ? "✓" : "✕"}
            </span>{" "}
            {toastMessage}
          </p>
        </div>
      )}
    </>
  );
};

export default ExerciseActions;
