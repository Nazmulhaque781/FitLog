"use client";

import React, { createContext, useContext, useState } from "react";

interface PlanExercise {
  id: number;
  name: string;
  image: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
}

interface PlanContextType {
  plan: PlanExercise[];
  saved: PlanExercise[];
  planCount: number;
  savedCount: number;
  totalMinutes: number;
  totalCalories: number;
  addToPlan: (exercise: PlanExercise) => void;
  removeFromPlan: (id: number) => void;
  saveExercise: (exercise: PlanExercise) => void;
  removeSavedExercise: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<PlanExercise[]>([]);
  const [saved, setSaved] = useState<PlanExercise[]>([]);

  const addToPlan = (exercise: PlanExercise) => {
    setPlan((prev) => {
      const alreadyExists = prev.some((item) => item.id === exercise.id);

      if (alreadyExists) {
        return prev;
      }

      return [...prev, exercise];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const saveExercise = (exercise: PlanExercise) => {
    setSaved((prev) => {
      const alreadyExists = prev.some((item) => item.id === exercise.id);

      if (alreadyExists) {
        return prev;
      }

      return [...prev, exercise];
    });
  };

  const removeSavedExercise = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  const isInPlan = (id: number) => {
    return plan.some((item) => item.id === id);
  };

  const isSaved = (id: number) => {
    return saved.some((item) => item.id === id);
  };

  const totalMinutes = plan.reduce((total, item) => total + item.duration, 0);

  const totalCalories = plan.reduce(
    (total, item) => total + item.caloriesBurned,
    0,
  );

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        planCount: plan.length,
        savedCount: saved.length,
        totalMinutes,
        totalCalories,
        addToPlan,
        removeFromPlan,
        saveExercise,
        removeSavedExercise,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};
