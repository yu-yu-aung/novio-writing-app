import React from 'react'

const SmallHeading = ({title = ""}) => {
  return (
        <div className="flex items-center gap-4 mb-4 sm:mb-8 lg:mb-10">
          <img
            src="/swan.png"
            alt="Logo"
            className="size-[100px] dark:hidden"
          />
          <img
            src="/light_swan.png"
            alt="Logo"
            className="size-[100px] hidden dark:block"
          />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        </div>
        
  )
}

export default SmallHeading