import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // Use the useNavigate hook from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  return (
    <>
      {/* Top section of the navbar */}
      <div className="w-full flex justify-between items-center font-semibold">
        {/* Navigation arrows */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)} // Navigate back
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt="Back"
          />
          <img
            onClick={() => navigate(1)} // Navigate forward
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt="Forward"
          />
        </div>
        {/* Right section with action buttons */}
        <div className="flex items-center gap-4">
          {/* Explore Premium button (hidden on smaller screens) */}
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block">
            Explore Premium
          </p>
          {/* Install App button */}
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Install App
          </p>
          {/* User profile icon */}
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
            L
          </p>
        </div>
      </div>
      {/* Bottom section with navigation categories */}
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
