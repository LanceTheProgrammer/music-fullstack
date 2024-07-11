import React from "react";
import { assets } from "../assets/assets"; // Assuming assets are correctly imported
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#003A10] min-h-screen pl-[4vw]">
      {/* Logo for desktop view */}
      <img
        src={assets.logo}
        alt=""
        className="mt-5 w-[max(10vw,100px)] hidden sm:block"
      />
      {/* Logo for mobile view */}
      <img
        src={assets.logo_small}
        className="mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block"
        alt=""
      />
      {/* Navigation links */}
      <div className="flex flex-col gap-5 mt-10">
        {/* NavLink for Add Song */}
        <NavLink
          to="/add-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_song} className="w-5" alt="" /> {/* Add Song icon */}
          <p className="hidden sm:block">Add Song</p> {/* Text label */}
        </NavLink>

        {/* NavLink for List Song */}
        <NavLink
          to="/list-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.song_icon} className="w-5" alt="" /> {/* List Song icon */}
          <p className="hidden sm:block">List Song</p> {/* Text label */}
        </NavLink>

        {/* NavLink for Add Album */}
        <NavLink
          to="/add-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_album} className="w-5" alt="" /> {/* Add Album icon */}
          <p className="hidden sm:block">Add Album</p> {/* Text label */}
        </NavLink>

        {/* NavLink for List Album */}
        <NavLink
          to="/list-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.album_icon} className="w-5" alt="" /> {/* List Album icon */}
          <p className="hidden sm:block">List Album</p> {/* Text label */}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

// Renders a sidebar navigation panel with links to different pages (Add Song, List Song, Add Album, List Album). Each link is represented by a NavLink from react-router-dom and includes an icon and text for desktop and mobile views. This component uses NavLink from react-router-dom to create links that navigate to specific routes (/add-song, /list-song, /add-album, /list-album). Each link includes an icon and text label, styled with CSS classes for appearance and responsiveness.
