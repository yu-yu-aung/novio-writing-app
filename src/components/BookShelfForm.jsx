import { saveBookShelftoDB } from '@/lib/bookshelf';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';

const BookShelfForm = ({showForm, setShowForm}) => {
  const { register, handleSubmit, reset} = useForm(); 
  const {user} = useAuthStore(); 
  const router = useRouter(); 

  const onSubmit = async (data) => { 
    if (!user) return; 

    const { data: bookshelf} = await saveBookShelftoDB(user, data);  

    toast.success("Bookshelf created!")
    reset(); 
    setShowForm(false); 
    router.push(`/bookshelf/${bookshelf.id}`)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`transition-all duration-300 overflow-hidden ${
        showForm ? "opacity-100 max-h-[400px]" : "opacity-0 max-h-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6 mt-4">
        <div className="relative w-full">
          <input
            id="title"
            type="text"
            {...register("title", { required: true })}
            className="block w-full py-3 px-3 text-sm text-heading bg-background-soft
            border-b-2 border-default focus:outline-none focus:border-brand rounded-md transition peer"
          />
          <label
            htmlFor="title"
            className="absolute left-3 top-3 text-body text-sm transition-all
            peer-focus:text-brand peer-focus:-top-2 peer-focus:text-xs
            peer-valid:-top-2 peer-valid:text-xs"
          >
            Title
          </label>
        </div> 

        <div className="relative w-full">
          <input
            id="category"
            type="text"
            {...register("category")}
            className="block w-full py-3 px-3 text-sm text-heading bg-background-soft
            border-b-2 border-default focus:outline-none focus:border-brand rounded-md transition peer"
          />
          <label
            htmlFor="category"
            className="absolute left-3 top-3 text-body text-sm transition-all
            peer-focus:text-brand peer-focus:-top-2 peer-focus:text-xs
            peer-valid:-top-2 peer-valid:text-xs"
          >
            Category
          </label>
        </div>

        <div className="relative w-full">
          <textarea
            id="description"
            rows="3"
            {...register("description")}
            className="block w-full py-3 px-3 text-sm text-heading bg-background-soft
            border-b-2 border-default focus:outline-none focus:border-brand rounded-md transition peer"
          />
          <label
            htmlFor="description"
            className="absolute left-3 top-3 text-body text-sm transition-all
            peer-focus:text-brand peer-focus:-top-2 peer-focus:text-xs
            peer-valid:-top-2 peer-valid:text-xs"
          >
            Description
          </label>
        </div>

        <button
          type="submit"
          className="bg-coral-tree-300 dark:bg-coral-tree-800 text-heading font-semibold hover:scale-105 rounded px-6 py-3 shadow transition"
        >
          Create
        </button>
      </div>
    </form>
  )
}

export default BookShelfForm