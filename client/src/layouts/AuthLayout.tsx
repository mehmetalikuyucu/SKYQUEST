import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-blue-600">My App</h3>
        <div className="mt-4">{children}</div>
        <div className="mt-4 text-center text-gray-600">
          <Link to="/" className="hover:underline">
            Back to Home"
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
