"use client";

import SmallHeading from "@/components/SmallHeading";
import { saveBookShelftoDB } from "@/lib/bookshelf";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!user) return;

    const { data: bookshelf } = await saveBookShelftoDB(user, data);

    toast.success("Bookshelf created!");
    reset();
    router.push(`/bookshelf/${bookshelf.id}`);
  };

  return (
    <div className="px-4 sm:px-8 lg:px-24 py-10 flex flex-col items-center">
      <SmallHeading title="Bookshelf" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          mx-auto mt-6
          w-full max-w-lg
          transition-all duration-300
        "
      >
        <div className="flex flex-col items-center gap-6 lg:gap-5">
          {/* Title */}
          <div className="relative w-full">
            <input
              id="title"
              type="text"
              {...register("title", { required: true })}
              className="block w-full py-3 px-3 text-sm text-heading bg-background-soft
                border-b-2 border-default focus:outline-none focus:border-brand
                rounded-md transition peer"
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

          {/* Category */}
          <div className="relative w-full">
            <input
              id="category"
              type="text"
              {...register("category")}
              className="block w-full py-3 px-3 text-sm text-heading bg-background-soft
                border-b-2 border-default focus:outline-none focus:border-brand
                rounded-md transition peer"
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

          {/* Description */}
          <div className="relative w-full">
            <textarea
              id="description"
              rows={3}
              {...register("description")}
              className="block w-full py-3 px-3 text-sm text-heading bg-background-soft
                border-b-2 border-default focus:outline-none focus:border-brand
                rounded-md transition peer resize-none"
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

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 bg-coral-tree-300 dark:bg-coral-tree-800
              text-heading font-semibold
              rounded px-6 py-3 shadow
              hover:scale-105 transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
