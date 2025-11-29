"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeButton() {
  
  const {theme, setTheme} = useTheme(); 
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
  }, [])
  
  if (!mounted) return null; 

  return (
    <button
      onClick={() => setTheme( theme === "light" ? "dark" : "light")}
      type="button"
      className="flex items-center gap-2 w-full px-4 sm:px-6 py-2 rounded-lg transition font-medium cursor-pointer hover:bg-amethyst-200 dark:hover:bg-amethyst-700"
    >
      {theme === "light" ? <Moon className="w-5 h-5 focus:outline-none" /> : <Sun className="w-5 h-5 focus:outline-none" />}
      <span>Tap to Change Mode</span>
    </button>
  );
}
