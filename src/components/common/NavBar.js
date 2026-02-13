import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
    { name: "Ingredient Search", path: "/ingredient-search" },
  ];

  if (user) {
    navLinks.push(
      { name: "Add Recipe", path: "/add-recipe" },
      { name: "My Collection", path: "/recipe-data" },
    );
  }

  return (
    <nav className="sticky top-0 z-50 glass bg-white/90 backdrop-blur-md border-b border-orange-100 px-4 py-3 md:py-4 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <img
            src="/images/logo-no-background.png"
            alt="KhanaKhajana"
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-orange-600"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-sm text-purple-600 hover:text-purple-700 font-bold transition-colors"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {user ? (
            <div className="flex items-center space-x-3 md:space-x-4">
              <Link to="/profile" className="flex items-center space-x-2 group">
                <img
                  src={
                    user.profilePicture ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-orange-100 group-hover:border-orange-500 transition-all object-cover shadow-sm"
                />
                <span className="text-gray-700 text-xs md:text-sm font-bold group-hover:text-orange-600 transition-colors hidden sm:inline">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:block bg-orange-600 text-white px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-1 md:space-x-2">
              <Link
                to="/login"
                className="text-gray-600 hover:text-orange-600 text-sm font-bold px-3 py-2 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-orange-50 transition-colors text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col space-y-2 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 rounded-xl text-base font-bold transition-all ${
                location.pathname === link.path
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="px-4 py-3 rounded-xl text-base font-bold text-purple-600 hover:bg-purple-50"
            >
              Admin Panel
            </Link>
          )}

          {!user && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 mt-2">
              <Link
                to="/login"
                className="text-center py-3 rounded-xl text-gray-700 font-bold hover:bg-gray-50 border border-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-center py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 shadow-md shadow-orange-50"
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <div className="pt-4 border-t border-gray-100 mt-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl text-red-600 font-bold hover:bg-red-50 flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
