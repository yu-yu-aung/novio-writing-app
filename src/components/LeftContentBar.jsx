
import Link from 'next/link'
import React from 'react'
import ChapterCard from './ChapterCard'
import { Plus } from 'lucide-react'

const LeftContentBar = ({storyId, story, chapters, user}) => {
  return (
    <section
        className="
          hidden sm:flex 
          sm:col-span-2 lg:col-span-2 
          flex-col 
          gap-6 
          border-r border-default 
          py-10 pr-6 sm:py-16 lg:py-20 
          bg-background-soft
        "
      >
        <div className="flex flex-col space-y-4 items-center justify-between">
          <img src={story?.image_url} alt="Story Cover Image" />
          <Link href={`/stories/${storyId}`} className="">{story?.title}</Link>
          <Link href={`/profile`}>{user?.penName}</Link>
        </div>

        {!chapters || chapters.length === 0 ? (
          <p className="text-center text-text-secondary">No chapters yet!</p>
        ) : (
          chapters.map((chapter, index) => (
            <ChapterCard chapter={chapter} key={index} storyId={storyId}/>
          ))
        )}

        <Link href={`/stories/${storyId}/new_chapter`} className="bg-white dark:bg-gray-800 border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out hover:scale-[1.02] transform cursor-pointer flex">
          <Plus /> <span>Create a new chapter</span>
        </Link>
      </section>
  )
}

export default LeftContentBar