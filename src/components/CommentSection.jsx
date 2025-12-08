'use client'

import useAuthStore from '@/store/useAuthStore';
import { Send } from 'lucide-react';
import React, { useState } from 'react';

const CommentSection = ({ commentText, setCommentText }) => {
  const [comments, setComments] = useState([]);
  const { user } = useAuthStore();

  const handleSendComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      text: commentText,
      userName: user.userName || "Anonymous",
      image: user.image,
      penName: user.penName
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 space-y-6">

      {/* Input Section */}
      <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 border rounded-2xl shadow-sm">
        {/* Avatar */}
        <img
          src={user?.image || "/default-user.png"}
          alt="profile"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-gray-300"
        />

        {/* Input */}
        <div className="flex-1">
          <input
            className="
              w-full border border-gray-300 rounded-xl px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-purple-400
            "
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendComment}
          className="
            p-3 rounded-xl
            bg-purple-600 hover:bg-purple-700 
            text-white shadow
            transition
          "
        >
          <Send size={18} />
        </button>
      </div>

      {/* All Comments */}
      {comments.length > 0 && (
        <div className="p-4 bg-white dark:bg-gray-800 border rounded-2xl shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-1">
            Comments
          </h2>

          {comments.map((c, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-500"
            >
              <img
                src={c.image || "/default-user.png"}
                alt="profile"
                className="w-10 h-10 rounded-full border object-cover"
              />

              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {c.penName || "User"}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mt-1">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
