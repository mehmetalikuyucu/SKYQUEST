import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../router/hoooks/useAuthStore";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <button onClick={logout} className="hover:underline">
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/auth" className="hover:underline">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-gray-200">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 My App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
