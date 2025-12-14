import HeroSection from "@/components/HeroSection";
import Library from "@/components/Library";

export default function Home() {
  return (
    <div className="px-4 sm:px-8 lg:px-24 py-16 w-full bg-amethyst-50 dark:bg-amethyst-950">
      <HeroSection />
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100 border-l-4 pl-4 border-amethyst-600">
        Your Library
      </h2>
      <Library type="home" />
    </div>
  );
}
