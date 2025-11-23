
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <div className='w-full grid grid-cols-5 items-center bg-amethyst-50'>
      <div className='col-span-3 text-gray-900 flex flex-col gap-6 h-full'>
        <h2>Free to Create, Free to Savour</h2>
      <h3>Read and Write with Novio</h3>

      <Link href='/authentication'>
        <button>
        Get Started Now!
      </button>
      </Link>
      </div>
      <div className='col-span-2'>
        <Image 
        src="/images/img1.png" 
        alt='A girl writing with her laptop!' 
        className='object-cover'
        width={500}
        height={300}  
      />
      </div>
      
    </div>
  )
}

export default HeroSection