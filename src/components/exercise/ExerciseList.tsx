"use client";

import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { getExercises } from "@/services/exerciseApi";

interface Exercise {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
}

const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();

        setExercises(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load exercises.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  /* Loading */
  if (loading) {
    return (
      <section className="min-h-screen bg-[#0c0d0f] px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-gray-400">
            Loading exercises...
          </p>
        </div>
      </section>
    );
  }

  /* Error */
  if (error) {
    return (
      <section className="min-h-screen bg-[#0c0d0f] px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0c0d0f] px-4 py-10">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            The Library
          </h1>

          <p className="mt-1 text-xs text-[#8b8f98]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExerciseList;