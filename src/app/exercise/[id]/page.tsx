import Image from "next/image";
import { notFound } from "next/navigation";
import ExerciseActions from "@/components/ExerciseActions";
import { getExerciseById } from "@/services/exerciseApi";

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
  instructions: string[];
}

export default async function ExerciseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise: Exercise | null = await getExerciseById(id);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0d0f13] px-6 py-8 text-white">
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* IMAGE */}
        <div className="h-[430px] overflow-hidden rounded-xl border border-[#272b34] bg-[#151820]">
          <Image
            src={exercise.image}
            alt={exercise.name}
            width={900}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <section>
          {/* TITLE */}
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            {exercise.name}
          </h1>

          {/* RATING */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-[#c6ff00]">★</span>
            <span className="text-xs font-bold text-white">
              {exercise.rating}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
            {exercise.description}
          </p>

          {/* MUSCLE GROUPS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {exercise.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#c6ff00] px-3 py-1 text-[10px] font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* STATS */}
          <div className="mt-5 overflow-hidden rounded-xl border border-[#272b34] bg-[#151820]">
            {[
              ["EQUIPMENT", exercise.equipment],
              ["DIFFICULTY", exercise.difficulty],
              ["SETS", String(exercise.sets)],
              ["REPS", exercise.reps],
              ["DURATION", `${exercise.duration} min`],
              ["CALORIES", `${exercise.caloriesBurned} kcal`],
              ["RATING", String(exercise.rating)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-[#252933] px-4 py-3 last:border-0"
              >
                <span className="text-[9px] font-semibold tracking-wider text-gray-500">
                  {label}
                </span>

                <span className="text-[11px] text-gray-200">{value}</span>
              </div>
            ))}
          </div>

          {/* INSTRUCTIONS */}
          <h2 className="mt-6 text-xs font-bold tracking-wide text-white">
            INSTRUCTIONS
          </h2>

          <ol className="mt-3 space-y-2 text-[10px] leading-relaxed text-gray-400">
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>
                {index + 1}. {instruction}
              </li>
            ))}
          </ol>

          {/* ACTION BUTTONS */}
          <ExerciseActions
            exercise={{
              id: exercise.id,
              name: exercise.name,
              image: exercise.image,
              equipment: exercise.equipment,
              duration: exercise.duration,
              caloriesBurned: exercise.caloriesBurned,
              rating: exercise.rating,
            }}
          />
        </section>
      </main>
    </div>
  );
}
