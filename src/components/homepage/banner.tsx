import Image from "next/image";
import Link from "next/link";
import bannerImg from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="w-full bg-[#0b0d0f] px-4 py-6 sm:px-5 sm:py-9">
      <div className="mx-auto flex min-h-[350px] w-full max-w-7xl flex-col items-center justify-between overflow-hidden rounded-md bg-[#15171c] px-6 py-8 sm:px-8 sm:py-10 lg:min-h-[350px] lg:flex-row lg:px-11">
        {/* TEXT */}
        <div className="z-10 w-full max-w-[530px]">
          <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.8px] text-[#b6ff00]">
            Workout Library
          </p>

          <h1 className="max-w-[500px] text-3xl font-black uppercase leading-[0.95] tracking-[-1px] text-white sm:text-4xl md:text-5xl">
            Train with intent. Log
            <br />
            every set.
          </h1>

          <p className="mt-4 max-w-[480px] text-xs leading-[1.55] text-[#92969e] sm:text-sm">
            FitLog is a dark, no-nonsense gym companion; pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-6 inline-flex rounded-md bg-[#b6ff00] px-5 py-3 text-[10px] font-extrabold uppercase text-black transition hover:bg-[#c5ff33]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* IMAGE */}
        <div className="mt-8 flex w-full justify-center lg:mt-0 lg:w-auto lg:justify-end">
          <Image
            src={bannerImg}
            alt="Workout illustration"
            width={300}
            height={300}
            priority
            className="h-[200px] w-[200px] object-contain sm:h-[240px] sm:w-[240px] lg:h-[285px] lg:w-[285px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
