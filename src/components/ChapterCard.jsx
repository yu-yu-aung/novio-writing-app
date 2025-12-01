import React from 'react'

const ChapterCard = ({chapter, storyId}) => {
  return (
    <div className="bg-background-soft border border-default rounded-lg p-4 shadow-sm hover:shadow-md transition">

      <h3 className="text-lg font-semibold">
        <span className="font-semibold">{chapter.chapter_number}.</span>
        {" "}{chapter.title}
      </h3>
      <p className="text-sm text-text-secondary mt-1">
        Last Updated: {chapter.updated_at}
      </p>
    </div>
  )
}

export default ChapterCard