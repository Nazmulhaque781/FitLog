import Image from "next/image";
import Link from "next/link";

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

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <Link
      href={`/exercise/${exercise.id}`}
      className="group block overflow-hidden rounded-xl border border-[#292c31] bg-[#15171b] transition duration-300 hover:-translate-y-1 hover:border-[#b7ff00]"
    >
      {/* Image */}
      <div className="relative h-[230px] w-full overflow-hidden">
        <Image
          src={exercise.image}
          alt={exercise.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="px-4 pb-4 pt-3">

        {/* Muscle Groups */}
        <div className="mb-3 flex flex-wrap gap-2">
          {exercise.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#b7ff00] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Exercise Name */}
        <h2 className="text-[15px] font-extrabold uppercase tracking-wide text-white">
          {exercise.name}
        </h2>

        {/* Equipment */}
        <p className="mt-1 text-[10px] text-[#8b8f98]">
          {exercise.equipment}
        </p>

        {/* Divider */}
        <div className="my-3 border-t border-[#292c31]" />

        {/* Exercise Info */}
        <div className="flex items-center gap-4 text-[10px] text-[#8b8f98]">

          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <span>◷</span>
            <span>{exercise.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5">
            <span>♥</span>
            <span>{exercise.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <span>★</span>
            <span>{exercise.rating}</span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;