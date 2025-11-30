

import { create } from 'zustand'

const useStoryStore = create((set) => {
  story: null, 
  setStory= (storyData) => set({
    story: storyData
  })
  deleteStory: () => {
    set ({
      story: null
    })
  }
})

export default useStoryStore;