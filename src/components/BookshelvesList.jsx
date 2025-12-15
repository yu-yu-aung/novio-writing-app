import useFetchAllBookshelves from '@/hooks/useFetchAllBookshelves';
import useAuthStore from '@/store/useAuthStore'
import React, { useState } from 'react'

const BookshelvesList = () => {
  const {user } = useAuthStore(); 
  const [showBooks, setShowBooks] = useState(false); 

  const { bookshelves, error, loading} = useFetchAllBookshelves(user); 
  
  return (
    <div>
      {bookshelves?.map((shelf) => {
        <div>
        <h2>{shelf.title}</h2>
        <p>{shelf.category}</p>
        <p>{shelf.description}</p>
      </div>
      })}
      
    </div>
    
  )
}

export default BookshelvesList