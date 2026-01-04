const EditChapterSkeleton = () => {
  return (
    <div className="col-span-7 sm:col-span-5 lg:col-span-5 flex flex-col gap-6 p-6 overflow-hidden animate-pulse">
      
      {/* Heading */}
      <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Form */}
      <div className="flex flex-col gap-4">

        {/* Image Upload */}
        <div className="w-full h-[120px] sm:h-[200px] lg:h-[300px] 
                        border border-gray-300 dark:border-gray-600 
                        rounded-md bg-gray-100 dark:bg-gray-800 
                        flex items-center justify-center">
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>

        {/* Chapter Number */}
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Title */}
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Content */}
        <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Button */}
        <div className="h-10 w-40 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

    </div>
  );
};

export default EditChapterSkeleton;
