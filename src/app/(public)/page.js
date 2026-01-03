import HeroSection from "@/components/HeroSection";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <div className="px-4 sm:px-8 lg:px-24 py-16 w-full bg-amethyst-50 dark:bg-amethyst-950">
      <HeroSection />

      <HomePage />
    </div>
  );
}
