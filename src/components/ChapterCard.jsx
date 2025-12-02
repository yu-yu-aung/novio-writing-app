import { useRouter } from 'next/navigation'
import React from 'react'

const ChapterCard = ({ chapter, storyId }) => {

  const router = useRouter(); 

  const formattedDateTime = new Date(chapter.updated_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const handleClickCard = () => {
    router.push(`/stories/${storyId}/chapters/${chapter.id}/view`);
  }

  return (
    <div 
    onClick={handleClickCard}
      className="bg-white dark:bg-gray-800 border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out hover:scale-[1.02] transform cursor-pointer"
    >
      
      <h3 className="text-base sm:text-lg md:text-xl font-bold  mb-2">
        {chapter.title}
      </h3>
      
      <p className="text-xs sm:text-xs lg:text-sm text-gray-500">
        Last Updated: <span className="font-medium">{formattedDateTime}</span>
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
          Chapter {chapter.chapter_number}
        </span>
      </div>
    </div>
  )
}

export default ChapterCard
