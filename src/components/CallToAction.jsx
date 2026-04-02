import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
  return (
     <section className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-100/40 via-indigo-100/30 to-transparent dark:from-purple-900/20 dark:via-indigo-900/10 blur-2xl" />

      {/* Top CTA */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="/bookfairy.png"
            alt="Book Fairy"
            className="w-[200px] sm:w-[300px] lg:w-[380px] drop-shadow-2xl hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="text-center lg:text-left space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight bg-amethyst-700 bg-clip-text text-transparent">
            Open the door to endless stories
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            Build your own world, connect with passionate readers, and share your imagination freely.
          </p>

          <Link
            href="/stories/create_story"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-amethyst-800 to-amethyst-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
          >
            Start Writing 
          </Link>
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="mt-24">
        <div className="relative rounded-lg p-10 sm:p-14 text-center bg-linear-to-tl from-amethyst-200 to-amethyst-900 dark:from-amethyst-900 dark:to-amethyst-600  dark:bg-gray-900/60 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-lg text-white">

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold  dark:text-white">
              A calm space to create, explore, and share
            </h3>

            <p className=" dark:text-gray-400 text-xl">
              Join a community where your stories matter and your creativity thrives.
            </p>

            <Link
              href="/sign_up"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-coral-tree-500 to-coral-tree-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
            >
              Get Started 
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction