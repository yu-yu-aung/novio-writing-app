'use client'
import useAuthStore from '@/store/useAuthStore'
import { Copy, Facebook, Mail, Send, Twitter } from 'lucide-react';
import React from 'react'

const ShareMoodle = ({share, setShare}) => {

  const {user} = useAuthStore(); 
  return (
    <div>
      {/* Modal for sharing user profile */}
      <div className={`fixed z-50 top-40 left-10 sm:left-20 lg:left-30 ${!share ? "hidden" : ""} bg-white rounded-xl shadow-lg p-2 sm:p-4 lg:p-6 w-[280px] sm:w-[500px] lg:w-[500px] border border-gray-200 flex flex-col items-center`}>
        <h3 className="tex-lg sm:text-xl lg:text-xl font-semibold mb-4 text-gray-800 line-clamp-2">{user.userName}</h3>

        <div className="flex w-full items-center justify-between bg-gray-100 p-2 rounded mb-4">
          <p className="truncate text-gray-700 w-[300px] line-clamp-2 h-auto text-sm">{window.location.href}</p>
          <button  
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard")
              setShare(false); 
              }
            }
            className="text-amethyst-600 hover:text-amethyst-800 border-l-2 border-gray-600 pl-2 flex items-center gap-1"
          >
            <Copy className="size-4 sm:size-5 lg:size-5" />
            Copy
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm uppercase">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 sm:flex lg:flex gap-4 mb-4">
          <button 
            onClick={() => {
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, 
                "_blank"
              )
              setShare(false); 
            }}
            className="flex items-center justify-center gap-2 p-2 bg-amethyst-600 text-white rounded hover:bg-amethyst-700 transition"
          >
            <Facebook className="size-4 sm:size-5 lg:size-5"  />
            Facebook
          </button>
          <button 
            onClick={() => {
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(user.title)}`, 
                "_blank"
              )
              setShare(false); 
            }}
            className="flex items-center justify-center gap-2 p-2 bg-amethyst-400 text-white rounded hover:bg-amethyst-500 transition"
          >
            <Twitter className="size-4 sm:size-5 lg:size-5" />
            Twitter
          </button>
          <button 
            onClick={() => {
              window.open(
                `https://mail.googlt.com/mail/?view=cm&fs=1&su=${encodeURIComponent(user.title)}&body=${encodeURIComponent(window.location.href)}`, 
                "_blank"
              )
              setShare(false); 
            }}
            className="flex items-center justify-center gap-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <Mail className="size-4 sm:size-5 lg:size-5" />
            Mail
          </button>
          <button 
            onClick={() => {
              window.open(
                `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(user.title)}`, 
                "_blank"
              )
            setShare(false); 
            }}
            className="flex items-center justify-center gap-2 p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
          >
            <Send className="size-4 sm:size-5 lg:size-5"  />
            Telegram
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={() => setShare(false)}
          className="w-full py-2 mt-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ShareMoodle