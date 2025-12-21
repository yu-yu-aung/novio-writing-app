import useFetchAuthor from '@/hooks/useFetchAuthor'
import { useRouter } from 'next/navigation'
import React from 'react'

const StoryCard = ({ story }) => {
  const router = useRouter();
  //const { author } = useFetchAuthor({ userId: story.author_id });
  console.log("story: ", story);
  return (
    <div
      onClick={() => router.push(`/p_stories/${story.id}`)}
      className="
        group cursor-pointer 
        bg-white dark:bg-neutral-900 
        rounded-lg overflow-hidden 
        border border-neutral-200 dark:border-neutral-700 
        shadow-sm hover:shadow-md 
        transition-all duration-300 
        w-full max-w-xs sm:max-w-sm md:max-w-md h-full 
      "
    >
      {/* IMAGE */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={story.image_url || '/placeholder.jpg'}
          alt={story.title}
          className="
            w-full h-full object-cover 
            group-hover:scale-105 transition-all duration-500
          "
        />
      </div>

      {/* CARD CONTENT */}
      <div className="p-2 sm:p-4 lg:p-4 text-center flex flex-col">
        <h5 className="text-sm md:text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2">
          {story.title} 
        </h5>

        <h6 className="mt-4 text-xs text-neutral-600 dark:text-neutral-300">
          {story?.author?.pen_name}
        </h6>

      </div>
    </div>
  );  
};

export default StoryCard;
