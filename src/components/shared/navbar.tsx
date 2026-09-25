"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const { planCount, savedCount } = usePlan();

  return (
    <div className="navbar fixed left-0 top-0 z-50 min-h-[62px] w-full border-b border-[#202326] bg-[#0b0d0f] px-5 shadow-sm">
      {/* LEFT */}
      <div className="navbar-start">
        <button className="btn btn-ghost gap-2 px-0 text-white hover:bg-transparent">
          <Image
            src={logo}
            alt="FITLOG Logo"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="text-sm font-extrabold tracking-wide">FITLOG</span>
        </button>
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-full bg-[#1a2b00] px-4 py-2 text-[10px] font-bold text-[#b6ff00] hover:bg-[#1a2b00]"
          >
            Workouts
          </Link>

          <Link
            href="/plan"
            className="rounded-full px-4 py-2 text-[10px] font-medium text-[#85898e] hover:bg-transparent hover:text-white"
          >
            My Plan
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-5">
        {/* Plan */}
        <Link
          href="/plan"
          className="flex items-center gap-2 bg-transparent p-0 text-[10px] text-[#aaaeb3]"
        >
          <span>Plan</span>

          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#b6ff00] text-[9px] font-bold text-[#101010]">
            {planCount}
          </span>
        </Link>

        {/* Saved */}

        <Link
          href="/plan"
          className="flex items-center gap-2 bg-transparent p-0 text-[10px] text-[#aaaeb3]"
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
