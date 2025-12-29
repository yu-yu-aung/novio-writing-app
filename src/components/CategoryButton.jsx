import Link from "next/link";
import React from "react";

const CategoryButton = ({ category = "" }) => {
  return (
    <Link
      href={`/search?query=${category}`}
      className="
        border-2 flex items-center py-2 px-3 sm:p-4 rounded-lg border-amethyst-600 hover:border-transparent hover:bg-amethyst-600 active:bg-amethyst-600 duration-200 hover:text-amethyst-50 text-amethyst-850 
      "
    >
      <span
        className="whitespace-nowrap capitalize font-semibold
        "
      >
        {category}
      </span>
    </Link>
  );
};

export default CategoryButton;
