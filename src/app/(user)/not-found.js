"use client";

import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StoryNotFound() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center w-full max-w-lg lg:max-w-xl space-y-6 sm:space-y-8">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
          Page not found
        </h2>

        {/* Illustration */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <img
            src="/404_light.png"
            alt="Page not found"
            className="w-full dark:hidden"
          />
          <img
            src="/404_dark.png"
            alt="Page not found"
            className="w-full hidden dark:block"
          />
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted max-w-md">
          This page may have been deleted, made private, or never existed.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-primary text-white text-sm sm:text-base font-medium transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
          >
            <ArrowBigLeft className="size-4 sm:size-5" />
            Back
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border-default text-sm sm:text-base font-medium transition hover:bg-background-subtle"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
