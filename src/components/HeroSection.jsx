'use client'

import useAuthStore from '@/store/useAuthStore'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {

  const { isLoggedIn } = useAuthStore(); 

  return (
    <div 
      className='px-4 sm:px-8 lg:px-24 py:6 sm:py-10 lg:py-16 
        w-full grid grid-cols-5 bg-amethyst-50 dark:bg-amethyst-950'>

      <div className='col-span-3 text-gray-900 dark:text-gray-100 
        flex flex-col items-center justify-between gap-4 sm:gap-6 lg:gap-10 h-full z-10 text-center'>

        <h1 className='text-xl sm:text-4xl lg:text-6xl font-bold font-sans'>
          Novio - Book Paradise
        </h1>
        <h2 className='text-sm sm:text-3xl lg:text-4xl font-bold font-sans'>
          Free to Create, Free to Savour
        </h2>
        <h3 className='text-sm sm:text-3xl lg:text-4xl font-bold font-sans'>
          Read and Write with Novio
        </h3>

        {!isLoggedIn ? (
          <Link
            href='/sign_up'
            className='mt-auto text-sm sm:text-xl lg:text-3xl font-bold 
            rounded bg-coral-tree-700 text-white p-2 sm:p-4 font-body'
          >
            <button>Get Started Now!</button>
          </Link>
        ) : (
          <Link
            href='/stories/create_story'
            className='mt-auto text-sm sm:text-xl lg:text-3xl font-bold 
            rounded bg-coral-tree-700 text-white p-2 sm:p-4 font-body'
          >
            <button>Create a Story Now</button>
          </Link>
        )}

      </div>

      <div className='col-span-2 flex justify-end items-center overflow-visible'>
        <img
          src="/images/img1.png"
          alt="A girl writing with her laptop!"
          className="w-[350px] sm:w-[450px] lg:w-[550px] h-auto object-contain"
        />
      </div>
    </div>

  )
}

export default HeroSection
