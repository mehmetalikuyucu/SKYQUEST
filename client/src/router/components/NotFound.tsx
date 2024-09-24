import React from "react";
import { Link } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import HomeIcon from "@mui/icons-material/Home";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#001F3F] to-[#3A6D8C] text-[#EAD8B1]">
      <FlightIcon className="text-9xl mb-8 animate-bounce" />
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-3xl mb-8">Oops! This flight path doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#EAD8B1] text-[#001F3F] rounded-full hover:bg-[#6A9AB0] hover:text-[#EAD8B1] transition-colors duration-300 flex items-center space-x-2 text-lg font-semibold"
      >
        <HomeIcon />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
