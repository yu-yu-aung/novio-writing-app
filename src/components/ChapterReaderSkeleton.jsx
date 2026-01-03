const ChapterReaderSkeleton = () => {
  return (
    <div
      className="
        flex flex-col sm:grid sm:grid-cols-7
        w-full min-h-screen
        bg-background-default
        px-4 sm:px-6 lg:px-24
        animate-pulse
      "
    >
      <div className="col-span-7 sm:col-span-5 flex flex-col gap-6 p-6">

        {/* Header */}
        <div className="flex items-center gap-4 my-4">
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded sm:hidden" />
          <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end gap-4 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"
            />
          ))}
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto py-12 space-y-6">
          {/* Chapter Title */}
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

          {/* Paragraphs */}
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChapterReaderSkeleton;
