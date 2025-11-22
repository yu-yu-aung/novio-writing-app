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
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 
                 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 
                 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg 
                 text-sm p-2.5"
    >
      {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
