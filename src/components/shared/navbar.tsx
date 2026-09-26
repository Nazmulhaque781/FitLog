"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const { planCount, savedCount } = usePlan();

  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-[62px] w-full items-center border-b border-[#202326] bg-[#0b0d0f] px-3 shadow-sm sm:px-5">
      {/* LEFT - LOGO */}
      <div className="flex shrink-0 items-center">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-white hover:bg-transparent"
        >
          <Image
            src={logo}
            alt="FITLOG Logo"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />

          <span className="text-xs font-extrabold tracking-wide sm:text-sm">
            FITLOG
          </span>
        </Link>
      </div>

      {/* CENTER - NAVIGATION */}
      <div className="mx-auto flex items-center">
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Link
            href="/"
            className="rounded-full bg-[#1a2b00] px-2.5 py-2 text-[9px] font-bold text-[#b6ff00] sm:px-4 sm:text-[10px]"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-2.5 py-2 text-[9px] font-medium text-[#85898e] hover:text-white sm:px-4 sm:text-[10px]"
          >
            My Plan
          </Link>
        </div>
      </div>

      {/* RIGHT - COUNTERS */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-5">
        {/* PLAN */}
        <Link
          href="/my-plan"
          className="flex items-center gap-1 text-[9px] text-[#aaaeb3] sm:gap-2 sm:text-[10px]"
        >
          <span>Plan</span>

          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#b6ff00] text-[9px] font-bold text-[#101010]">
            {planCount}
          </span>
        </Link>

        {/* SAVED */}
        <Link
          href="/my-plan"
          className="flex items-center gap-1 text-[9px] text-[#aaaeb3] sm:gap-2 sm:text-[10px]"
        >
          <span>Saved</span>

          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#34383d] text-[9px] text-[#aaaeb3]">
            {savedCount}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
