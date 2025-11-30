

import { create } from 'zustand'

const useChapterStore = create((set) => {
  chapter: null, 
  setChapter: (chapterData) => {
    set({
      chapter: chapterData
    
    })
  },
  deleteStory: () => {
    set ({
      story: null
    })
  }
})

export default useChapterStore;