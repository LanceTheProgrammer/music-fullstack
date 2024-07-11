import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  // Retrieve songsData and albumsData from PlayerContext
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      {/* Render the Navbar component */}
      <Navbar />
      <div className="mb-4">
        {/* Section for featured charts */}
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {/* Map through albumsData and render AlbumItem components */}
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        {/* Section for today's biggest hits */}
        <h1 className="my-5 font-bold text-2xl">Todays' biggest hits</h1>
        <div className="flex overflow-auto">
          {/* Map through songsData and render SongItem components */}
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
