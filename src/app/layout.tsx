
import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0c0d0f] text-white">
        <PlanProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 pt-[62px]">
              {children}
            </main>

            <Footer />
          </div>
        </PlanProvider>
      </body>
    </html>
  );
}

