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
          <h2 className="text-2xl lg:text-3xl font-bold text-heading">
            {title}
          </h2>
        </div>
        
  )
}

export default SmallHeading