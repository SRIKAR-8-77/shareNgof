import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo1.jpg";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <img src={logo} alt="ShareNgo Logo" className="h-8 w-8" />
          <span className="text-yellow-400">
            Share<span className="text-white">Ngo</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/about" className="hover:text-yellow-400">About Us</Link>
          <Link to="/services" className="hover:text-yellow-400">Services</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact Us</Link>
        </nav>

        {/* Auth or User Section */}
        <div className="hidden md:flex items-center gap-3 text-white">
          {!currentUser ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-50 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:underline"
                >
                  <span>{currentUser.name}</span>
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      currentUser.name
                    )}&background=yellow&color=black&rounded=true`}
                    alt="user avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </Link>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 pb-4 text-white font-medium space-y-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-yellow-400"
          >
            About Us
          </Link>
          <Link
            to="/services"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-yellow-400"
          >
            Services
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-yellow-400"
          >
            Contact Us
          </Link>
          {!currentUser ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-yellow-400 border border-yellow-400 rounded px-4 py-2 hover:bg-yellow-50 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block bg-yellow-400 text-black rounded px-4 py-2 hover:bg-yellow-500"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 hover:underline"
              >
                <span>{currentUser.name}</span>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    currentUser.name
                  )}&background=yellow&color=black&rounded=true`}
                  alt="user avatar"
                  className="h-8 w-8 rounded-full"
                />
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-600 rounded px-4 py-2 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
