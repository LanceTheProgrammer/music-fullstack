import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, desc, id }) => {
  // Use the useNavigate hook from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  return (
    // Wrapper div for the album item with an onClick event to navigate to the album page
    <div 
      onClick={() => navigate(`/album/${id}`)} // Navigate to the album's page using its id
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      {/* Album image */}
      <img className="rounded" src={image} alt={name} />
      {/* Album name */}
      <p className="font-bold mt-2 mb-1">{name}</p>
      {/* Album description */}
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItem;
