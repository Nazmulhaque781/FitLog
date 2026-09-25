import React from "react";
import Image from "next/image";
import bannerImg from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="w-full bg-[#0b0d0f] px-5 py-9">
      <div className="relative mx-auto flex min-h-[350px] w-full items-center overflow-hidden rounded-md bg-[#15171c] px-10 py-10 lg:px-11">

        <div className="z-10 max-w-[530px]">
          <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.8px] text-[#b6ff00]">
            Workout Library
          </p>

          <h1 className="max-w-[500px] text-4xl font-black uppercase leading-[0.95] tracking-[-1px] text-white sm:text-5xl">
            Train with intent. Log
            <br />
            every set.
          </h1>

          <p className="mt-4 max-w-[480px] text-sm leading-[1.45] text-[#92969e]">
            FitLog is a dark, no-nonsense gym companion; pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button className="mt-6 rounded-md bg-[#b6ff00] px-5 py-3 text-[10px] font-extrabold uppercase text-black hover:bg-[#c5ff33]">
            Browse Workouts
          </button>
        </div>

        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block">
          <Image
            src={bannerImg}
            alt="Workout illustration"
            width={300}
            height={300}
            priority
            className="h-[285px] w-[285px] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;