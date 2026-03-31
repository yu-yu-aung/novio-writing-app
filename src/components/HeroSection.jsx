'use client'

import useAuthStore from '@/store/useAuthStore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const HeroSection = () => {
  const { isLoggedIn } = useAuthStore()
  const [ mounted, setMounted ] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null; 

  return (
    <section className=" w-full overflow-hidden py-10 sm:py-12 lg:py-18 px-12">
      <div
        className="max-w-7xl mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Text Content */}
        <div className="flex flex-col gap-6 sm:gap-8 text-center lg:text-left">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Novio
            <span className="block text-amethyst-600 dark:text-amethyst-400">
              Book Paradise
            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Free to create. Free to savour.
          </p>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
            Read captivating stories, create your own fiction worlds, and build your
            personal library. All in one place!
          </p>

          {/* CTA */}
          {!isLoggedIn ? (
            <Link
              href="/sign_up"
              className="inline-flex w-fit mx-auto lg:mx-0 items-center justify-center px-4 py-3 sm:py-4 rounded-full bg-coral-tree-700 text-white text-sm sm:text-base lg:text-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              Get Started Now
            </Link>
          ) : (
            <Link
              href="/stories/create_story"
              className="inline-flex w-fit mx-auto lg:mx-0 items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-coral-tree-700 text-white text-sm sm:text-base lg:text-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition"
            >
              Create a Story
            </Link>
          )}
        </div>

        {/* Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/img1.png"
            alt="A girl writing with her laptop"
            className="w-[260px] sm:w-[360px] lg:w-[500px] h-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
