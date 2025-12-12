import React from 'react'

const NotiCard = ({ image, content, time, onClick, isViewed}) => {
  const formattedDateTime = new Date(time).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })


  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 rounded-xl border cursor-pointer transition ${
        isViewed ? "bg-gray-50 dark:bg-gray-700" : "bg-amethyst-50 dark:bg-amethyst-900"
      } hover:bg-amethyst-100 dark:hover:bg-amethyst-850`}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 overflow-hidden rounded-full shrink-0">
        <img
          src={image}
          alt="profile picture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 sm:gap-2">
        <p className="text-xs sm:text-base lg:text-lg font-semibold leading-tight wrap-break-word">
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
