
import "@/styles/globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Novia, Writer's Paradise",
  description: "Novia is a modern writing platform for creators, offering seamless content management, intuitive design, and a vibrant space to write, share, and explore stories."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
