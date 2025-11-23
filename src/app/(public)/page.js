import CardSlider from "@/components/CardSlider";
import HeroSection from "@/components/HeroSection";

export default function Home() {

  const stories = [
  {
    id: 1,
    title: "Wuthering Heights",
    category: "classic",
    genre: "gothic",
    author: "Emily Bronte",
    image: "/images/wuthering_heighs.png"
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    category: "classic",
    genre: "romance",
    author: "Jane Austen",
    image: "/images/pride_and_prejudice.png"
  },
  {
    id: 3,
    title: "Frankenstein",
    category: "classic",
    genre: "gothic",
    author: "Mary Shelley",
    image: "/images/frankenstein.png"
  },
  {
    id: 4,
    title: "1984",
    category: "dystopian",
    genre: "political fiction",
    author: "George Orwell",
    image: "/images/1984.png"
  },
  {
    id: 5,
    title: "Moby-Dick",
    category: "classic",
    genre: "adventure",
    author: "Herman Melville",
    image: "/images/moby_dick.png"
  },
  {
    id: 6,
    title: "Jane Eyre",
    category: "classic",
    genre: "gothic romance",
    author: "Charlotte Brontë",
    image: "/images/jane_eyre.png"
  }
];

  return (
    <div className='px-4 sm:px-8 lg:px-24 py-16 w-full bg-amethyst-50 dark:bg-amethyst-950'>
      <HeroSection/>
      <h2>Various Genres</h2>
      <CardSlider stories={stories}/>
    </div>
  );
}
