import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const DisplayAlbum = ({ album }) => {
  // Get the album ID from the URL parameters
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  
  // Get the playWithId function, albumsData, and songsData from PlayerContext
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  // Use useEffect to find and set the album data based on the ID from the URL
  useEffect(() => {
    albumsData.map((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
  }, [albumsData, id]);

  // Render the album data if it exists
  return albumData ? (
    <>
      {/* Navbar component */}
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        {/* Album cover image */}
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col">
          <p>Playlist</p>
          {/* Album name */}
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          {/* Album description */}
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="Spotify" />
            <b>Spotify</b>• 1,323,154 likes • <b>50 songs,</b> about 2 hr 30min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock icon" />
      </div>
      <hr />
      {/* List of songs filtered by the current album */}
      {songsData
        .filter((item) => item.album === album.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)} // Play the song when clicked
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a77a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt={item.name} />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayAlbum;
