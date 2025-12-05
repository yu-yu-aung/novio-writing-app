"use client";

import SmallHeading from "@/components/SmallHeading";
import supabase from "@/lib/supabaseClient";
import { uploadProfileImage } from "@/lib/upload";
import useAuthStore from "@/store/useAuthStore";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const { user, setUser } = useAuthStore();
  const [previewImage, setPreviewImage] = useState(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.userName || "",
      penName: user?.penName || "",
      email: user?.userEmail || "",
      bio: user?.bio || "",
    },
  });

  if (!user) return null;

  console.log("user: ", user);

  const onSubmit = async (data) => {
    try {
      const file = data.image?.[0];
      let imageUrl = user.image;

      // Upload new image if provided
      if (file) {
        const uploadedUrl = await uploadProfileImage(file, user.userId);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      console.log("uploaded image: ", imageUrl);

      const { data: profile, error } = await supabase
        .from("profiles")
        .update({
          user_name: data.userName,
          pen_name: data.penName,
          email: data.email,
          bio: data.bio,
          profile_image_url: imageUrl,
        })
        .eq("user_id", user.userId)
        .select()
        .single();

      console.log("returned info: ", profile);

      setUser({
        userId: profile?.user_id,
        userName: profile?.user_name,
        penName: profile?.pen_name,
        userEmail: profile?.email,
        bio: profile?.bio,
        image: profile?.profile_image_url,
      });

      //console.log("updated info: ", user);

      if (error) {
        console.error("Supabase Error: ", error);
        toast.error("Error updating profile!");
        return;
      }

      toast.success("Profile updated!");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error!");
    }
  };

  return (
    <section className="w-full mx-auto py-10 px-4 sm:px-8 lg:px-24 flex flex-col items-center">
      <SmallHeading title="Edit Profile" />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10 w-full"
      >
        {/* Image Upload */}
        <div className="relative group">
          <label className="block relative cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              {...register("image", {
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  console.log("image file: ", file);
                  setPreviewImage(URL.createObjectURL(file));
                },
              })}
            />
            <div className="size-28 sm:size-44 border-2 border-dashed border-brand rounded-full bg-brand-soft cursor-pointer flex items-center justify-center  overflow-hidden">
              <img
                src={
                  previewImage
                    ? previewImage
                    : user.image
                    ? user.image
                    : "/placeholder.png"
                }
                alt="profile"
                className="rounded-full w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-amethyst-600 dark:bg-amethyst-300 text-white dark:text-black rounded-full p-2 shadow cursor-pointer hover:scale-110 transition">
                <Pen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </label>
        </div>

        {/* user info */}
        <div className="w-full max-w-md">
          {/* User Name */}
          <div className="relative mb-6 group">
            <input
              type="text"
              {...register("userName", {
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z0-9_]+$/,
                  message:
                    "Only letters, numbers, and underscores allowed. No spaces allowed.",
                },
              })}
              className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
            />
            <label className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs">
              User Name
            </label>

            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Penname */}
          <div className="relative mb-6 group">
            <input
              type="text"
              id="penName"
              {...register("penName")}
              className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
            />
            <label className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs">
              Pen Name
            </label>
          </div>

          {/* Email */}
          <div className="relative mb-6 group">
            <input
              type="email"
              {...register("email")}
              className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
            />
            <label className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs">
              Email
            </label>
          </div>

          {/* Bio */}
          <div className="relative mb-6 group">
            <textarea
              rows="3"
              {...register("bio")}
              className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
            />
            <label className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs">
              Bio
            </label>
          </div>

          {/*Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-amethyst-300 dark:bg-amethyst-600 hover:scale-110 rounded px-5 py-3 mt-2 shadow transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setPreviewImage(null);
              }}
              className="bg-coral-tree-100 dark:bg-coral-tree-600 hover:scale-110 rounded px-5 py-3 mt-2 shadow transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
export default Page;
