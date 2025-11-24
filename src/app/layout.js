import "@/styles/globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import MainFooter from "@/components/MainFooter";
import { Toaster } from "sonner";

export const metadata = {
  title: "Novio, Writer's Paradise",
  description:
    "Novio is a modern writing platform for creators, offering seamless content management, intuitive design, and a vibrant space to write, share, and explore stories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
        <Toaster position="top-center" richColors closeButton expand />
      </body>
    </html>
  );
}
