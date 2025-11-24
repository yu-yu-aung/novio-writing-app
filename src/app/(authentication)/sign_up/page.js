import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <AuthForm mode="Sign Up" />
      <div>
        <p>Already have an account?</p>
        <Link href={"/log_in"}>Log In Here</Link>
      </div>
    </div>
  );
};

export default Page;
