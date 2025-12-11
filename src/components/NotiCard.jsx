import React from 'react'

const NotiCard = ({ image, content, time}) => {
  const formattedDateTime = new Date(time).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })


  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-brand-soft border rounded-xl p-3 sm:p-4 hover:bg-brand-soft/80 transition">
      <div>
        <img
          src={image}
          alt="profile picture"
          className="size-14 sm:size-16 lg:size-20 object-cover rounded-full"
        />
      </div>

      <div className="flex flex-col gap-1 sm:gap-2">
        <p className="text-sm sm:text-base lg:text-lg font-semibold leading-tight">
          {content}
        </p>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {formattedDateTime}
        </p>
      </div>
    </div>
  );
};

export default NotiCard;
