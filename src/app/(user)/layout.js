import "@/styles/globals.css";
import Header from "@/components/Header";
import SubFooter from "@/components/SubFooter";

export const metadata = {
  title: "Novio, Writer's Paradise",
  description:
    "Novio is a modern writing platform for creators, offering seamless content management, intuitive design, and a vibrant space to write, share, and explore stories.",
};

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-amethyst-50 dark:bg-amethyst-950 text-gray-900 dark:text-gray-100">
      <Header />
      {children}
      <SubFooter />
    </div>
  );
}
