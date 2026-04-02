import React from "react";
import { BookOpen, PenLine, Library } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Read Unlimited Stories",
    description:
      "Explore a vast collection of stories from writers around the world.",
  },
  {
    icon: PenLine,
    title: "Write & Publish",
    description:
      "Share your creativity with the world. Write, edit, and publish instantly.",
  },
  {
    icon: Library,
    title: "Personal Library",
    description:
      "Organize your favorite stories into beautiful, custom collections.",
  },
];

const Features = () => {
  return (
    <section className="relative py-20 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-purple-50/40 to-transparent dark:via-purple-900/10 blur-2xl" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
          Features Designed for You
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-base sm:text-lg">
          Everything you need to read, write, and manage your stories beautifully.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Glow hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-xl" />

              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md group-hover:scale-110 transition">
                  <Icon size={28} />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
