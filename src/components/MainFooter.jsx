import Link from "next/link";

const MainFooter = () => {
  return (
    <footer className="
      bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700
      mt-auto
      px-4 sm:px-8 lg:px-24 py-10
    ">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link href="/" className="flex gap-2 items-center mb-3">
            <img src="/logo.png" alt="Novio Logo" className="w-10 h-10" />
            <h2 className="text-xl font-bold italic font-serif">Novio</h2>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            A peaceful space for writers to create, explore, and share their stories.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Categories</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><Link className="hover:text-amethyst-500 transition" href="#">Articles</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Poems</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Short Stories</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Journals</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Essays</Link></li>
          </ul>
        </div>

        {/* Genres */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Genres</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><Link className="hover:text-amethyst-500 transition" href="#">Romance</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Fantasy</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Horror</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Drama</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Sci-Fi</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><Link className="hover:text-amethyst-500 transition" href="/profile">Your Profile</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Help Center</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Privacy Policy</Link></li>
            <li><Link className="hover:text-amethyst-500 transition" href="#">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Novio — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default MainFooter;
