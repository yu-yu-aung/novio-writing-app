import React from 'react'

const SubFooter = () => {
  return (
    <footer className='mt-auto'>
      <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Novio — All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default SubFooter