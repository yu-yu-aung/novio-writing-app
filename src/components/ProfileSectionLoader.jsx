const ProfileSectionLoader = () => {
  return (
    <section className="lg:col-span-3 flex flex-col items-center gap-8 border-b lg:border-r lg:border-b-transparent border-default py-8 sm:py-16 lg:py-20 px-6 bg-background-soft animate-pulse">
      
      {/* Profile Image Skeleton */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gray-300 dark:bg-gray-700" />

      {/* User Info Skeleton */}
      <div className="flex flex-col items-center gap-2 text-center w-full">
        <div className="h-6 sm:h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded" />
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded" />
      </div>

      {/* About Skeleton */}
      <div className="flex flex-col items-center gap-2 text-center w-full">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded" />
        <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded" />
      </div>

      {/* Stats Skeleton */}
      <div className="flex gap-10 mt-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
        ))}
      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-2 sm:gap-4 mt-6 w-full justify-between">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="h-10 sm:h-12 flex-1 bg-gray-300 dark:bg-gray-700 rounded-lg"
          />
        ))}
      </div>
    </section>
  );
};

export default ProfileSectionLoader