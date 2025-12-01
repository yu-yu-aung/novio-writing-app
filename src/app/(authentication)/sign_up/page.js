import AuthForm from "@/components/AuthForm";
import SmallHeading from "@/components/SmallHeading";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-600 shadow-md rounded-lg p-6">
        <SmallHeading title="Sign Up Now!" />
        <AuthForm mode="Sign Up" />
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>
            Already have an account?{" "}
            <Link href="/log_in" className="text-blue-600 hover:underline">
              Log In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
