'use client'

import useAuthStore from '@/store/useAuthStore'

import React from 'react'
import CategorySection from './CategorySection';
import Library from './Library';
import Features from './Features';
import CallToAction from './CallToAction';

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
          <CallToAction/>
          </>
        )
      }
    </div>
      
  )
}

export default HomePage