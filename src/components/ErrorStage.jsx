import React from 'react'

const ErrorStage = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center'>
      <h2 className="font-semibold text-2xl text-red-600  mb-4">Something went wrong!</h2>
      <img 
        src='/error.png' 
        alt='a girl struggling because of technical glitch' className="w-40 h-40 object-contain opacity-80"
      />
    </div>
  )
}

export default ErrorStage