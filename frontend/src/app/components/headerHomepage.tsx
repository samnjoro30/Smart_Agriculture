import Link from 'next/link';
import Image from 'next/image';

export default function HeaderHome() {
  return (
    <header className="bg-green-50 shadow-md sticky top-0 z-50 rounded-bl-3xl rounded-br-3xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-xl md:text-2xl font-bold text-green-700">
            Smart Farm Agriculture
          </h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="hidden md:flex space-x-6 text-green-800 font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#impact"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Impact
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-all duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/auth/register"
                className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-all duration-200"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
