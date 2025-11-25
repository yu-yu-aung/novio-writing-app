import { Star } from "lucide-react";

const SmallStoryCard = ({
  title = "Wuthering Heights",
  author = "Ahahaha",
  image = "/placeholder.png",
  likes = "4k",
  onEdit = () => {
    console.log("You clicked next!");
  },
}) => {
  return (
    <div className="flex gap-6 items-start p-6  bg-amethyst-50 dark:bg-amethyst-950 text-gray-950 dark:text-gray-100 rounded-xl shadow dark:shadow-amethyst-850 mt-6 w-full">
      {/* Book Cover */}
      <img
        src={image}
        className="w-36 h-56 object-cover rounded-lg"
        alt={title}
      />

      {/* Details */}
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>

        <h4 className="text-sm text-muted mb-2">{author}</h4>

        <div className="flex items-center gap-2 mb-4 text-yellow-500">
          <Star className="size-4" />
          <p className="text-sm text-heading">{likes} Likes</p>
        </div>

        <button
          onClick={onEdit}
          className="px-4 py-2 rounded bg-brand-soft text-brand border border-brand hover:bg-brand-light transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default SmallStoryCard;
