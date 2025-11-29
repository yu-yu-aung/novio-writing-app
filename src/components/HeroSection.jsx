
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='px-4 sm:px-8 lg:px-24 py-16 w-full grid grid-cols-5 bg-amethyst-50 dark:bg-amethyst-950'>
      <div 
        className='col-span-3 text-gray-900 dark:text-gray-100 flex flex-col items-center gap-10 h-full'>
        <h1 className='text-xl sm:text-4xl lg:text-6xl font-bold font-sans'>Novio - Book Paradise</h1>
        <h2 className='text-lg sm:text-3xl lg:text-4xl font-bold font-sans'>Free to Create, Free to Savour</h2>
        <h3 className='text-lg sm:text-3xl lg:text-4xl font-bold font-sans'>Read and Write with Novio</h3>

      <Link 
        href='/sign_up'
        className='mt-auto text-lg sm:text-2xl lg:text-3xl font-bold rounded bg-coral-tree-700 text-white p-4 font-body'  
      >
        <button >
          Get Started Now!
        </button>
      </Link>
      </div>
      <div className='col-span-2'>
        <Image 
        src="/images/img1.png" 
        alt='A girl writing with her laptop!' 
        className='object-cover'
        width={700}
        height={400}  
        />
      </div>
    </div>
  )
}

export default HeroSection