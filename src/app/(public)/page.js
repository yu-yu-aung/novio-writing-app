import HeroSection from "@/components/HeroSection";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <div className="px-4 sm:px-8 lg:px-24 py-16 w-full bg-gray-50 dark:bg-gray-900">
      <HeroSection />

      <HomePage />
    </div>
  );
}
