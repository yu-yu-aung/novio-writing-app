import React from "react";
import CategoryButton from "./CategoryButton";

const CategorySection = () => {
  const categories = [
    { id: 1, category: "fiction" },
    { id: 2, category: "non-fiction" },
    { id: 3, category: "poetry" },
    { id: 4, category: "fantasy" },
    { id: 5, category: "science fiction" },
    { id: 6, category: "romance" },
    { id: 7, category: "mystery" },
    { id: 8, category: "thriller" },
    { id: 9, category: "horror" },
    { id: 10, category: "biography" },
    { id: 11, category: "memoir" },
    { id: 12, category: "self-help" },
    { id: 13, category: "travel" },
    { id: 14, category: "children" },
    { id: 15, category: "historical" },
    { id: 16, category: "essay" },
    { id: 17, category: "satire" },
  ];

  return (
  <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-3xl font-bold text-amethyst-800 dark:text-amethyst-300 mb-4">
          Various Categories
        </h2>
        <p className="text-sm sm:text-lg text-gray-800 dark:text-gray-200 mt-1 mb-10">
          Explore various categories, explore different worlds ✨
        </p>
      </div>

      {/* Scrollable row */}
      <div
        className="
          flex gap-3 sm:gap-4
          overflow-x-auto
          px-4
          pb-2
          snap-x snap-mandatory
          scrollbar-none
        "
      >
        {categories.map((c) => (
          <div key={c.id} className="snap-start">
            <CategoryButton category={c.category} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
