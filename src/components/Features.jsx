import React from "react";

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-12 px-4 max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-amethyst-800 dark:text-amethyst-200">
          Features We Offer for You
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 mt-4">
          Best features to help you write or read 
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="group flex flex-col items-center text-center gap-4 p-6 transition-all duration-300 hover:-translate-y-1">
          <img
            src="/reading.png"
            alt="Read stories"
            className="w-20 h-20 object-contain group-hover:scale-110 transition"
          />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Read Unlimited Stories
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Discover and enjoy unlimited stories from writers around the world.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group flex flex-col items-center text-center gap-4 p-6 transition-all duration-300 hover:-translate-y-1">
          <img
            src="/write.png"
            alt="Write stories"
            className="w-20 h-20 object-contain group-hover:scale-110 transition"
          />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Write & Publish Stories
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Write freely, publish instantly, and share your creativity with others.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group flex flex-col items-center text-center gap-4 p-6  transition-all duration-300 hover:-translate-y-1">
          <img
            src="/library.png"
            alt="Personal library"
            className="w-20 h-20 object-contain group-hover:scale-110 transition"
          />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
            Personal Library & Shelves
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Save your favorite stories and organize them your way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
