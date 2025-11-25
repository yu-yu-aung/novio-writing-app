import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <AuthForm mode="Log In" />
      <div>
        <p>New here?</p>
        <Link href={"/log_in"}>Sign Up Here</Link>
      </div>
    </div>
  );
};

export default Page;
