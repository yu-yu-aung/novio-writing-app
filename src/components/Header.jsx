'use client'

import ThemeButton from "./ThemeButton"
import useAuthStore from '@/store/useAuthStore'
import { Search, User, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Header = () => {
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()
  const [keyWord, setKeyWord] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // mark client mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!keyWord.trim()) return

    router.push(`/search?query=${keyWord}`)
    setKeyWord("")
    setMenuOpen(false) // close menu on search
  }

  return (
    <header className="bg-gray-50 shadow-md py-5 px-4 sm:px-8 lg:px-24 sticky top-0 z-30">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <img src="/logo.png" alt="The Eagle's Daily News Logo" className="w-12 h-12" />
          <h2 className="text-lg sm:text-xl font-bold italic font-serif leading-tight">
            Eagle's <br /> Daily News
          </h2>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:block max-w-md w-[300px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search news…"
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2 bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-3 py-1.5"
            >
              Search
            </button>
          </div>
        </form>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link className="p-2 text-lg font-semibold hover:text-orange-700" href="/">Home</Link>

          {isLoggedIn ? (
            <Link href="/user-info" className="p-2 text-lg font-semibold hover:text-orange-700">
              <User />
            </Link>
          ) : (
            <>
              <button onClick={() => router.push("/auth?mode=signup")} className="p-2 text-lg font-semibold hover:text-orange-700">Register</button>
              <button onClick={() => router.push("/auth?mode=login")} className="p-2 text-lg font-semibold hover:text-orange-700">Log In</button>
            </>
          )}

          <ThemeButton/>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-white shadow-lg p-6 z-40
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          ${!mounted ? "opacity-0 pointer-events-none" : ""}
        `}
      >
        {mounted && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Eagle's Daily News</h3>
              <button onClick={() => setMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-12">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="search"
                  className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Search news…"
                  value={keyWord}
                  onChange={(e) => setKeyWord(e.target.value)}
                  required
                />
                <button type="submit" className="text-sm text-white absolute right-2.5 bottom-2 px-2 py-1 bg-orange-700 hover:bg-orange-800 font-medium rounded">
                  Search
                </button>
              </div>
            </form>

            {/* Mobile Nav Links */}
            <nav className="mt-8 flex flex-col gap-4 text-lg font-semibold">
              <Link href="/" className="hover:text-orange-700">Home</Link>

              {isLoggedIn ? (
                <Link href="/user-info" className="hover:text-orange-700 flex items-center gap-2">
                  <User /> Profile
                </Link>
              ) : (
                <>
                  <button onClick={() => router.push("/auth?mode=signup")} className="text-left hover:text-orange-700">Register</button>
                  <button onClick={() => router.push("/auth?mode=login")} className="text-left hover:text-orange-700">Log In</button>
                </>
              )}
              <ThemeButton/>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

export default Header