import Link from 'next/link'
import React from 'react'

const StoryCard = ({story}) => {
  return ( 
    <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">
      <Link href="#">
        <img 
          className="rounded-t-base" 
          src={story.image} 
          alt={story.title} 
        />
      </Link>
      
      <div className="p-6 text-center">
        
        <h5 className="mt-3 mb-6 text-xl font-semibold tracking-tight text-heading">
          {story.title}
        </h5>
          <h6 className="mt-3 mb-6 text-lg font-semibold tracking-tight text-heading">
          {story.author}
        </h6>
          <h6 className="mt-3 mb-6 text-lg font-medium tracking-tight text-heading">
          {story.category}
        </h6>
        <Link href="#" className="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
          Read Now
        </Link>
      </div>
    </div>


  )
}

export default StoryCard