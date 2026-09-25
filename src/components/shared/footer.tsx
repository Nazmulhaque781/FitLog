"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";

export default function Footer() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <footer className="w-full border-t border-[#191a1e] bg-[#0e0f12]">
      <div className="flex h-[70px] w-full items-center justify-between px-[20px]">
        {/* Left - Logo */}
        <div className="flex items-center gap-[8px]">
          <div
            className={`h-[26px] w-[26px] ${isHomePage ? "rotate-[-45deg]" : ""}`}
          >
            <Image
              src={logo}
              alt="FITLOG Logo"
              width={26}
              height={26}
              className="h-full w-full object-contain"
            />
          </div>

          <span className="text-[10px] font-bold tracking-[0.5px] text-white">
            FITLOG
          </span>
        </div>

        {/* Right - Copyright */}
        <p className="text-[10px] font-normal tracking-[0.1px] text-[#777980]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
