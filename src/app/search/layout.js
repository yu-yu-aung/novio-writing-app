import "@/styles/globals.css";
import Header from "@/components/Header";
import SubFooter from "@/components/SubFooter";

export const metadata = {
  title: "Novio, Writer's Paradise",
  description:
    "Novio is a modern writing platform for creators, offering seamless content management, intuitive design, and a vibrant space to write, share, and explore stories.",
};

export default function SearchLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <SubFooter />
    </div>
  );
}
