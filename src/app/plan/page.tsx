"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

export default function MyPlan() {
  const {
    plan,
    saved,
    totalMinutes,
    totalCalories,
    removeFromPlan,
    removeSavedExercise,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating" | "">(
    "",
  );

  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedCompleted = localStorage.getItem("fitlog-completed");

    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });

  const [toastMessage, setToastMessage] = useState("");

  const savedMinutes = saved.reduce((total, item) => total + item.duration, 0);

  const savedCalories = saved.reduce(
    (total, item) => total + item.caloriesBurned,
    0,
  );

  const currentItems = [...(activeTab === "today" ? plan : saved)].sort(
    (a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    },
  );

  const currentExercises = currentItems.length;

  const currentMinutes = activeTab === "today" ? totalMinutes : savedMinutes;

  const currentCalories = activeTab === "today" ? totalCalories : savedCalories;

  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      removeFromPlan(id);
      showToast("Removed from Today's Plan");
    } else {
      removeSavedExercise(id);
      showToast("Removed from Saved");
    }

    setCompletedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleMarkAsDone = (id: number) => {
    setCompletedIds((prev) => {
      const updatedIds = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];

      localStorage.setItem("fitlog-completed", JSON.stringify(updatedIds));

      return updatedIds;
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0f13] px-6 py-9 text-white">
      <main className="mx-auto max-w-6xl pb-16">
        {/* PAGE TITLE */}
        <div>
          <h1 className="text-[26px] font-black tracking-tight text-white">
            MY PLAN
          </h1>

          <p className="mt-1 text-[11px] text-[#777e8a]">
            Your workout plan for today. Finish them, then load more.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-6 flex min-h-[94px] items-center rounded-xl border border-[#292e36] bg-[#14171d] px-5">
          <Stat label="Exercises" value={String(currentExercises)} accent />

          <Divider />

          <Stat label="Minutes" value={String(currentMinutes)} />

          <Divider />

          <Stat label="Calories" value={String(currentCalories)} />
        </div>

        {/* TABS + SORT */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {/* TABS */}
          <div className="inline-flex rounded-lg border border-[#242932] bg-[#12151a] p-[3px]">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`rounded-md px-5 py-2 text-[10px] font-semibold transition ${
                activeTab === "today"
                  ? "border border-[#303641] bg-[#20252d] text-white"
                  : "text-[#777e8a] hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-5 py-2 text-[10px] font-semibold transition ${
                activeTab === "saved"
                  ? "border border-[#303641] bg-[#20252d] text-white"
                  : "text-[#777e8a] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* SORT */}
          {currentItems.length > 0 && (
            <div className="flex items-center gap-3 text-[10px] text-[#737a85]">
              <span>Sort by</span>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "duration" | "calories" | "rating" | "",
                  )
                }
                className="h-8 cursor-pointer rounded-lg border border-[#2a3039] bg-[#14171d] px-3 text-[10px] text-[#9ca2ad] outline-none transition hover:border-[#3b414c] focus:border-[#b8ff00]"
              >
                <option value="">Select</option>
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="mt-[18px]">
          {currentItems.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#292e36] bg-[#101318] text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#292e36] bg-[#151920]">
                <span className="text-xl text-[#b8ff00]">
                  {activeTab === "today" ? "＋" : "♡"}
                </span>
              </div>

              <h2 className="text-[16px] font-black tracking-tight text-white">
                {activeTab === "today"
                  ? "NOTHING HERE YET"
                  : "NOTHING SAVED YET"}
              </h2>

              <p className="mt-1 max-w-sm text-[10px] leading-5 text-[#747b86]">
                {activeTab === "today"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save exercises from the library and they will appear here."}
              </p>

              <Link
                href="/"
                className="mt-[18px] rounded-full bg-[#b8ff00] px-5 py-2.5 text-[10px] font-semibold text-black shadow-[0_5px_18px_rgba(184,255,0,.18)] transition hover:bg-[#c5ff35]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {currentItems.map((exercise, index) => {
                const isCompleted = completedIds.includes(exercise.id);

                return (
                  <div
                    key={exercise.id}
                    className={`group flex flex-col gap-3 rounded-xl border bg-[#14171d] p-3 transition sm:flex-row sm:items-center sm:gap-4 ${
                      isCompleted
                        ? "border-[#b8ff00]/30 opacity-70"
                        : "border-[#292e36] hover:border-[#3a404b]"
                    }`}
                  >
                    {/* IMAGE */}
                    <div className="relative h-[86px] w-[118px] shrink-0 overflow-hidden rounded-lg bg-[#0d0f13]">
                      <Image
                        src={exercise.image}
                        alt={exercise.name}
                        fill
                        className={`object-cover transition duration-300 group-hover:scale-105 ${
                          isCompleted ? "grayscale" : ""
                        }`}
                      />

                      {isCompleted && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b8ff00] text-sm font-black text-black">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#20252d] text-[9px] font-bold text-[#b8ff00]">
                          {index + 1}
                        </span>

                        <h3
                          className={`truncate text-sm font-bold uppercase ${
                            isCompleted
                              ? "text-[#858b96] line-through"
                              : "text-white"
                          }`}
                        >
                          {exercise.name}
                        </h3>
                      </div>

                      <p className="mt-1 text-[10px] text-[#737a85]">
                        {exercise.equipment}
                      </p>

                      <div className="mt-3 flex items-center gap-4 text-[10px] text-[#858b96]">
                        <span className="flex items-center gap-1">
                          <span>◷</span>
                          {exercise.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                          <span>♨</span>
                          {exercise.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1 text-[#b8ff00]">
                          <span>☆</span>
                          {exercise.rating}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex w-full shrink-0 items-center justify-end gap-2 sm:w-auto">
                      {/* VIEW DETAILS */}
                      <Link
                        href={`/exercise/${exercise.id}`}
                        className="rounded-lg border border-[#30343c] px-4 py-2 text-[10px] font-semibold text-[#858b96] transition hover:border-[#b8ff00] hover:bg-[#b8ff00]/5 hover:text-[#b8ff00]"
                      >
                        View Details
                      </Link>

                      {/* MARK AS DONE */}
                      {activeTab === "today" && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsDone(exercise.id)}
                          className="flex items-center justify-center gap-2 rounded-lg bg-[#b7ff00] px-4 py-2 text-[10px] font-semibold text-black transition hover:bg-[#c8ff33]"
                        >
                          <span className="text-sm font-black">✓</span>
                          {completedIds.includes(exercise.id)
                            ? "Completed"
                            : "Mark as Done"}
                        </button>
                      )}

                      {/* REMOVE BUTTON */}
                      <button
                        type="button"
                        onClick={() => handleRemove(exercise.id)}
                        aria-label={`Remove ${exercise.name}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#30343c] bg-transparent text-[20px] font-light leading-none text-[#737a85] transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* SUCCESS TOAST */}
      {toastMessage && (
        <div className="fixed right-6 top-4 z-[100] rounded-xl border border-[#b7ff00] bg-[#15171b] px-5 py-3 shadow-lg">
          <p className="text-sm font-bold text-white">
            <span className="text-[#b7ff00]">✓</span> {toastMessage}
          </p>
        </div>
      )}
    </div>
  );
}

function Divider() {
  return <div className="h-11 w-px bg-[#272b32]" />;
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex-1 px-1">
      <div className="mb-1 text-[9px] text-[#737a86]">{label}</div>

      <div
        className={`text-[32px] font-black leading-none ${
          accent ? "text-[#b8ff00]" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
