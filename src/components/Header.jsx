"use client";

import {
  Search,
  User2,
  Bell,
  HomeIcon,
  PencilLine,
  LogInIcon,
  LogIn,
  DoorOpen,
} from "lucide-react";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter(); 

  const [keyWord, setKeyWord] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Search for:", keyWord);
    if (!keyWord.trim()) return; 

    router.push(`/search?query=${keyWord}`)
    setKeyWord("");
  };

  const isActive = (path) =>
    pathname === path
      ? "text-coral-tree-700 dark:text-amethyst-300 font-bold"
      : "text-amethyst-900 dark:text-amethyst-100";

  return (
    <header className="bg-amethyst-100 dark:bg-amethyst-900 text-amethyst-900 dark:text-amethyst-100 shadow-md py-2 px-4 sm:px-8 lg:px-24 sticky top-0 z-40">

      <div className="grid grid-cols-1 sm:flex lg:flex sm:justify-between sm:items-center lg:justify-between lg:items-center">
        
        {/* Logo and Search Bar */}
        <div className="flex gap-2 sm:gap-4 lg:gap-12 items-center">
          <Link href="/" className="flex gap-1 items-center">
            <img
              src="/logo.png"
              alt="Novio Writing App Logo"
              className="size-10 sm:size-12 lg:size-16"
            />
            <h2 className="hidden sm:hidden lg:block lg:text-2xl font-bold italic font-serif">
              Novio
            </h2>
          </Link>

          <form onSubmit={handleSearch} className="max-w-md w-[280px] sm:w-[300px] lg:w-[400px]">
            <div className="relative">

              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="hidden sm:block size-4 text-gray-600 dark:text-gray-200" />
              </div>

              <input
                type="search"
                className="
                  block w-full rounded-lg p-2 sm:p-3 pl-2 sm:pl-10
                  text-xs sm:text-sm
                  text-gray-900 dark:text-gray-100
                  bg-amethyst-100 dark:bg-amethyst-850
                  border border-gray-300 dark:border-gray-600
                  focus:outline-none transition
                "
                placeholder="Explore stories"
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                required
              />

              <button
                type="submit"
                className="
                  absolute right-1 bottom-1 sm:bottom-2
                  px-2 py-1 sm:px-3 sm:py-1.5
                  rounded-lg text-sm transition
                  text-black dark:text-white
                  bg-transparent sm:bg-amethyst-300 sm:hover:bg-amethyst-400
                  sm:dark:bg-amethyst-700 sm:dark:hover:bg-amethyst-800
                "
              >
                <Search className="size-4 sm:hidden text-amethyst-900 dark:text-amethyst-400" />
                <span className="hidden sm:block">Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* NAVIGATION BAR*/}
        <nav className="flex items-center lg:gap-4 justify-between mt-2 sm:mt-0 lg:mt-0">

          <Link
            href="/"
            className={`
              flex items-center gap-1 p-2 font-medium transition
              hover:text-coral-tree-700 dark:hover:text-amethyst-300
              ${isActive("/")}
            `}
          >
            <HomeIcon className="size-6 sm:hidden" />
            <span className="hidden sm:block sm:text-lg lg:text-xl">Home</span>
          </Link>

          <Link
            href="/stories/create_story"
            className={`
              flex items-center gap-1 p-2 font-medium transition
              hover:text-coral-tree-700 dark:hover:text-amethyst-300
              ${isActive("/create_story")}
            `}
          >
            <PencilLine className="size-6 sm:hidden" />
            <span className="hidden sm:block sm:text-lg lg:text-xl">Create</span>
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className={`
                  flex items-center gap-1 p-2 font-medium transition
                  hover:text-coral-tree-700 dark:hover:text-amethyst-300
                  ${isActive("/profile")}
                `}
              >
                <User2 className="size-6 sm:hidden" />
                <span className="hidden sm:block sm:text-lg lg:text-xl">Profile</span>
              </Link>

              <Link
                href="/notification"
                className={`
                  flex items-center gap-1 p-2 font-medium transition
                  hover:text-coral-tree-700 dark:hover:text-amethyst-300
                  ${isActive("/notification")}
                `}
              >
                <Bell className="size-6 sm:hidden" />
                <span className="hidden sm:block sm:text-lg lg:text-xl">Notification</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign_up"
                className={`p-2 text-lg font-medium hover:text-coral-tree-700 dark:hover:text-amethyst-300 transition ${isActive("/sign_up")}`}
              >
                <DoorOpen className="size-6 sm:hidden" />
                <span className="hidden sm:block sm:text-lg lg:text-xl">Register</span>
              </Link>

              {/* LOGIN */}
              <Link
                href="/log_in"
                className={`p-2 text-lg font-medium hover:text-coral-tree-700 dark:hover:text-amethyst-300 transition ${isActive("/log_in")}`}
              >
                <LogIn className="size-6 sm:hidden" />
                <span className="hidden sm:block sm:text-lg lg:text-xl">Log In</span>
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;
