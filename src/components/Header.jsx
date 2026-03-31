"use client";

import {
  Search,
  User2,
  Bell,
  HomeIcon,
  PencilLine,
  LogIn,
  DoorOpen,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import useFetchAllNotifications from "@/hooks/useFetchAllNotifications";

const Header = () => {
  const { user, isLoggedIn } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const { notifications } = useFetchAllNotifications(user);

  const [showLogIn, setShowLogIn] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyWord.trim()) return;
    router.push(`/search?query=${keyWord}`);
    setKeyWord("");
  };

  const handleClickCreate = () => {
    isLoggedIn ? router.push("/stories/create_story") : setShowLogIn(true);
  };

  const isActive = (path) =>
    pathname === path
      ? "bg-amethyst-200 dark:bg-amethyst-300 text-coral-tree-900"
      : "text-gray-700 dark:text-gray-200";

  const unreadNoti = notifications.filter(
    (noti) => noti.is_viewed === false
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-800/70 border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4 ">

        {/* LEFT */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" className="size-10 lg:size-12" />
            <span className="hidden lg:block text-3xl font-bold italic">
              Novio
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search stories..."
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                className="pl-9 pr-4 py-2 w-[220px] lg:w-[320px] rounded-full bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-coral-tree-900"
              />
            </div>
          </form>
        </div>

        {/* RIGHT NAV */}
        <nav className="flex items-center gap-2 lg:gap-3">

          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${isActive("/")}`}
          >
            <HomeIcon className="size-4" />
            <span className="hidden sm:block text-sm">Home</span>
          </Link>

          <button
            onClick={handleClickCreate}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${isActive("/create_story")}`}
          >
            <PencilLine className="size-4" />
            <span className="hidden sm:block text-sm">Create</span>
          </button>

          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${isActive("/profile")}`}
              >
                <User2 className="size-4" />
                <span className="hidden sm:block text-sm">Profile</span>
              </Link>

              <Link
                href="/notification"
                className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition ${isActive("/notification")}`}
              >
                <Bell className="size-4" />
                <span className="hidden sm:block text-sm">Notifications</span>

                {unreadNoti.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {unreadNoti.length}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign_up"
                className="px-4 py-2 rounded-full text-sm font-medium bg-coral-tree-600 text-white hover:opacity-90 transition"
              >
                Sign Up
              </Link>

              <Link
                href="/log_in"
                className="px-4 py-2 rounded-full text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-amethyst-800 transition"
              >
                Log In
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* LOGIN MODAL */}
      {showLogIn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm top-100"
          onClick={() => setShowLogIn(false)}
        >
          <div
            className="relative w-[90%] max-w-md bg-white dark:bg-amethyst-800 rounded-2xl shadow-xl p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogIn(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <img src="/oops.png" className="w-40 mx-auto mb-4" />

            <h3 className="text-lg font-semibold mb-4">
              You need to log in to create stories
            </h3>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowLogIn(false);
                  router.push("/sign_up");
                }}
                className="px-4 py-2 bg-coral-tree-600 text-white rounded-full"
              >
                Sign Up
              </button>

              <button
                onClick={() => {
                  setShowLogIn(false);
                  router.push("/log_in");
                }}
                className="px-4 py-2 border rounded-full"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;