import AuthForm from "@/components/AuthForm";
import SmallHeading from "@/components/SmallHeading";
import Link from "next/link";

const Page = () => {
  return (
     <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-600 shadow-md rounded-lg p-6">
        <SmallHeading title="Welcome Back!" />
        <AuthForm mode="Log In" />
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            New here?{" "}
            <Link href="/sign_up" className="text-blue-600 hover:underline">
              Sign Up Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
