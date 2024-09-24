import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#001F3F] to-[#3A6D8C]">
      <div className="w-full max-w-md px-8 py-6 bg-white shadow-2xl rounded-lg">
        <div className="flex items-center justify-center mb-6">
          <FlightTakeoffIcon className="text-[#3A6D8C] mr-2 text-3xl" />
          <h3 className="text-2xl font-bold text-[#001F3F]">SkyQuest</h3>
        </div>
        <div className="mt-4">{children}</div>
        <div className="mt-6 text-center text-[#3A6D8C]">
          <Link
            to="/"
            className="hover:underline hover:text-[#001F3F] transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
