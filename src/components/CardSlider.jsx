"use client";

import { useState } from "react";
import StoryCard from "./StoryCard";

const CardSlider = ({ stories }) => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrent((prev) =>
      prev === 0 ? stories.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Slider */}
      <div className="relative w-full overflow-hidden py-10">
        <div className="flex justify-center gap-6 transition-transform">
          {stories.map((story, index) => {
            const distance = Math.abs(current - index);

            let scale = "scale-60 opacity-50"; // farthest cards
            if (distance === 0) scale = "scale-100 opacity-100";
            if (distance === 1) scale = "scale-90 opacity-90";
            if (distance === 2) scale = "scale-75 opacity-75";

            return (
              <div
                key={story.id}
                className={`transition-all duration-300 ease-out transform ${scale}`}
              >
                <StoryCard story={story} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-neutral-primary-soft rounded"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-brand text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
