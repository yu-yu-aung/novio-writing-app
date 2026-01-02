'use client'

import useAuthStore from '@/store/useAuthStore'

import React from 'react'
import CategorySection from './CategorySection';
import Library from './Library';
import Features from './Features';
import Link from 'next/link';

const HomePage = () => {
  const { isLoggedIn } = useAuthStore(); 
  return (
    <div>
      {
        isLoggedIn && (
          <>
          <CategorySection/>
          <Library type='home' />
          </>
        ) }
        
        { !isLoggedIn && (
          <>
          <CategorySection />
          <Features />
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Image — LEFT */}
            <div className="flex-1 flex justify-center lg:justify-around">
              <img
                src="/bookfairy.png"
                alt="Book Fairy"
                className="w-[160px] sm:w-[260px] lg:w-[360px] drop-shadow-xl"
              />
            </div>

            {/* Text — RIGHT */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-amethyst-800 dark:text-amethyst-300">
                A door to multiple genres, <br className="hidden sm:block" />
                different categories
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                Create your imaginary world with your hands. Meet readers who are crazy
                about your genre. Share stories with love!
              </p>

              <Link
                href="/stories/create_story"
                className="inline-flex items-center justify-center px-6 py-3 sm:py-4 rounded-full bg-amethyst-300 dark:bg-amethyst-800 text-black dark:text-white text-sm sm:text-base lg:text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition"
              >
                Let’s Create Now 
              </Link>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 w-full rounded-lg bg-amethyst-200 dark:bg-amethyst-850 px-4 sm:px-10 py-14 flex flex-col items-center justify-center gap-8 text-center">
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-amethyst-800 dark:text-amethyst-300 max-w-3xl">
              A peaceful space for writers to <br />
              create, explore, and share their stories.
            </h3>

            <Link
              href="/sign_up"
              className="inline-flex items-center justify-center px-8 py-3 sm:py-4 rounded-full bg-coral-tree-700 text-white text-sm sm:text-base lg:text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              Get Started Now 
            </Link>
          </div>
          </>
        )
      }
    </div>
      
  )
}

export default HomePage