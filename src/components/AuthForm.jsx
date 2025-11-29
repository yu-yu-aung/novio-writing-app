"use client";

import { signIn, signUp } from "@/lib/auth";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AuthForm = ({ mode = "Log In" }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const onSubmit = async (data) => {
    const { email, password, userName, penName } = data;
    setLoading(true);

    try {
      let response;

      if (mode === "Log In") {
        response = await signIn(email, password);
      } else {
        response = await signUp(email, password, userName, penName);
      }

      if (response.error) {
        toast.error(response.error.message || "Something went wrong!");
        reset({ password: "" });
        return;
      }

      const userData = {
        userId: response.data?.auth?.user?.id,
        userName: response.data?.profile?.user_name ?? userName,
        penName: response.data?.profile?.pen_name ?? penName,
        userEmail: email,
      };

      setUser(userData);
      toast.success(`${mode} successful! Welcome ${userData.penName}`);
      reset();
      router.push("/")
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-5"
    >
      {mode === "Sign Up" && (
        <>
          {/* Username */}
          <div>
            <label className="block mb-2.5 text-sm font-medium text-heading">
              Your user name
            </label>
            <input
              {...register("userName", {
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z0-9_]+$/,
                  message: "Only letters, numbers, underscores. No spaces.",
                },
              })}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Your username"
            />
            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>
            )}
          </div>

          {/* Pen name */}
          <div>
            <label className="block mb-2.5 text-sm font-medium text-heading">
              Your pen name
            </label>
            <input
              {...register("penName", { required: "Pen name is required" })}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Your pen name"
            />
            {errors.penName && (
              <p className="text-red-500 text-xs mt-1">{errors.penName.message}</p>
            )}
          </div>
        </>
      )}

      {/* Email */}
      <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Your email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="name@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Your password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {mode === "Sign Up" && (
        <label className="flex items-center mb-5">
          <input
            type="checkbox"
            {...register("remember", { required: "You must accept terms" })}
            className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
          />
          <p className="ms-2 text-sm font-medium text-heading select-none">
            I agree with the
            <a href="#" className="text-fg-brand hover:underline ml-2">
              terms and conditions
            </a>
          </p>
        </label>
      )}
      {errors.remember && <p className="text-red-500 text-xs mb-3">{errors.remember.message}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`bg-amethyst-300 box-border border border-transparent hover:bg-amethyst-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Please wait..." : mode}
      </button>
    </form>
  );
};

export default AuthForm;
