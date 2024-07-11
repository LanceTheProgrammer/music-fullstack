import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ name, image, desc, id }) => {
  // Access the playWithId function from PlayerContext
  const { playWithId } = useContext(PlayerContext);

  return (
    // Render a clickable div representing a song item
    <div
      onClick={() => playWithId(id)} // When clicked, play the song associated with id
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt={name} /> {/* Song image */}
      <p className="font-bold mt-2 mb-1">{name}</p> {/* Song name */}
      <p className="text-slate-200 text-sm">{desc}</p> {/* Song description */}
    </div>
  );
};

export default SongItem;

