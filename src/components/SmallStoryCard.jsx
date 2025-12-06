"use client";

import useFetchAuthor from "@/hooks/useFetchAuthor";
import useAuthStore from "@/store/useAuthStore";
import { Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const  SmallStoryCard = ({ story, storyId }) => {
  const authorId = story?.author_id;

  console.log("Author id: ", authorId);

  //fetch author's info using author id
  const { author, loading, error } = useFetchAuthor({userId: authorId});
  const { user } = useAuthStore(); 
  console.log("author info: ", author);

  const router = useRouter(); 

  const handleClickCard = () => {
    if ( user.id === authorId) {
      router.push(`/stories/${storyId}`);
    } else {
      router.push(`/p_stories/${storyId}`);
    }
    
  }

  return (
    <div
    onClick={handleClickCard}
      className="
        group flex flex-col md:flex-row gap-6 items-start 
        p-6 rounded-2xl w-full
        bg-white dark:bg-amethyst-950 
        shadow-sm hover:shadow-md transition-shadow
        border border-transparent dark:border-amethyst-800
      "
    >

      {/* Image */}
      <img
        src={story?.image_url}
        alt={story?.title}
        className="
          w-full md:w-36 h-56 object-cover rounded-xl 
          shadow-sm 
          group-hover:scale-[1.02] transition-transform
        "
      />

      {/* Content */}
      <div className="flex-1 w-full flex flex-col justify-between h-full">

        {/* Top Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold leading-tight">
            {story?.title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {author?.pen_name || "Loading..."}
          </p>

          <div className="flex items-center gap-2 text-yellow-500 text-sm mt-1">
            <Star className="w-4 h-4" />
            <span>4k Likes</span>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between items-center mt-4">

          {/* Edit Button */}
          <Link
            href="/stories/create_story"
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              border border-brand text-brand bg-brand-soft
              hover:bg-brand-light transition
            "
          >
            Edit
          </Link>

          {/* Status Badge */}
          <span
            className="
              px-3 py-1 rounded-full text-xs font-medium
              bg-amethyst-100 text-amethyst-700 
              dark:bg-amethyst-800 dark:text-amethyst-200
            "
          >
            {story?.status}
          </span>

        </div>

      </div>
    </div>

  );
};

export default SmallStoryCard;
