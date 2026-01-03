"use client"

import React, { useEffect, useState } from 'react'
import FontLoader from './FontLoader';

const EntryLoader = ({ children }) => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [])

  if (loading) {
    return <FontLoader />; 
  }
  return children; 
}

export default EntryLoader