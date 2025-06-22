import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl tracking-wide">
          Adon's Blog
        </Link>
        <nav className="space-x-6 text-lg">
          {user ? (
            <>
              <Link to="/admin" className="hover:underline">
                Dashboard
              </Link>
              <button onClick={logout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">
              Admin Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
