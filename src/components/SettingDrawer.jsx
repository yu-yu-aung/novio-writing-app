'use client'

import { Languages, X, LogOut, Trash2 } from 'lucide-react'
import React from 'react'
import ThemeButton from './ThemeButton';
import { signOut } from '@/lib/auth';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const SettingDrawer = ({ setShowSetting }) => {

  const { logOut } = useAuthStore(); 
  const router = useRouter(); 

  const handleClickX = () => setShowSetting(false);

  const handleLogOut = async () => {
    const toastId = toast(
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to log out?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(toastId)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(toastId);
                try {                  
                  await signOut();
                  logOut();
                  toast.success("Logged out successfully");
                  router.push("/");
                } catch (error) {
                  toast.error("Error: failed to log out!");
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>,
      { duration: Infinity }
    );  
  };

  const drawerButtonStyle =
    "flex items-center gap-2 w-full px-4 sm:px-6 py-2 rounded-lg transition font-medium cursor-pointer hover:bg-amethyst-200 dark:hover:bg-amethyst-700";

  return (
    <div className='h-full w-full bg-amethyst-100 dark:bg-amethyst-900 text-gray-900 dark:text-gray-100 shadow-lg flex flex-col p-6 space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg sm:text-xl lg:text-xl font-bold'>Settings</h2>
        <button onClick={handleClickX} className='p-1 rounded-full hover:bg-amethyst-200 dark:hover:bg-amethyst-700 transition'>
          <X className='size-5 sm:size-6 lg:size-7' />
        </button>
      </div>

      {/* Theme */}
      <ThemeButton />


      {/* Language */}
      <div className={drawerButtonStyle}>
        <Languages className='size-5' />
        <span>Change Language</span>
      </div>

      {/* Log Out */}
      <button 
        onClick={handleLogOut}
        className={drawerButtonStyle + ' text-red-600 dark:text-red-400'}
      >
        <LogOut className='size-5' />
        <span>Log Out</span>
      </button>

      {/* Delete Account */}
      <div className={drawerButtonStyle + ' text-red-800 dark:text-red-600'}>
        <Trash2 className='size-5' />
        <span>Delete Account</span>
      </div>

      {/* Footer / Optional */}
      <div className='mt-auto text-xs text-muted text-center'>
        &copy; {new Date().getFullYear()} Novio
      </div>
    </div>
  )
}

export default SettingDrawer;
