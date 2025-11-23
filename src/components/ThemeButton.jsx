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
      className="text-gray-500 dark:text-gray-400 hover:scale-110 active:scale-110  
                  focus:outline-none rounded-lg 
                 text-sm p-2.5"
    >
      {theme === "light" ? <Moon className="w-5 h-5 focus:outline-none" /> : <Sun className="w-5 h-5 focus:outline-none" />}
    </button>
  );
}
