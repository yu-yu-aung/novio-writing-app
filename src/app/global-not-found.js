"use client";

import { ThemeProvider } from "next-themes";
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html>
      <body className="min-h-screen bg-background-default text-heading">
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
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

              {/* Action */}
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-6 py-3 text-sm sm:text-base font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
              >
                Go Home
              </Link>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
