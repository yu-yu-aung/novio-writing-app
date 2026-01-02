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
    router.push(`/bookshelf/${bookshelf?.id}`);
  };

  return (
    <div className="px-4 sm:px-8 lg:px-24 py-14 flex flex-col items-center">
      <SmallHeading title="Create Bookshelf" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          mt-8 w-full max-w-xl
          bg-background-soft
          border border-default/40
          rounded-2xl
          px-6 py-8 lg:px-10 lg:py-10
          shadow-sm
        "
      >
        <div className="flex flex-col gap-6">
          {/* Name */}
          <div className="relative">
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="
                peer w-full
                py-3 px-3
                text-sm text-heading
                bg-transparent
                border-b-2 border-default
                focus:outline-none focus:border-brand
                transition
              "
            />
            <label
              htmlFor="name"
              className="
                absolute left-3 top-3
                text-body text-sm
                transition-all
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand
                peer-valid:-top-2 peer-valid:text-xs
              "
            >
              Name
            </label>
          </div>

          {/* Category */}
          <div className="relative">
            <input
              id="category"
              type="text"
              {...register("category")}
              className="peer w-full py-3 px-3 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition"
            />
            <label
              htmlFor="category"
              className="absolute left-3 top-3 text-body text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand peer-valid:-top-2 peer-valid:text-xs"
            >
              Category
            </label>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              className="peer w-full py-3 px-3 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition resize-none"
            />
            <label
              htmlFor="description"
              className="absolute left-3 top-3 text-body text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand peer-valid:-top-2 peer-valid:text-xs"
            >
              Description
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full bg-coral-tree-300 dark:bg-coral-tree-800 text-heading font-semibold py-3 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Create Bookshelf
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
