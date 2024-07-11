import React, { useEffect, useRef, useContext } from "react";
import DisplayHome from "./DisplayHome";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  // Get albumsData from PlayerContext
  const { albumsData } = useContext(PlayerContext);

  // Reference to the display div element
  const displayRef = useRef();

  // Get the current location from the router
  const location = useLocation();
  const isAlbum = location.pathname.includes("album"); // Check if the current path includes 'album'
  const albumId = isAlbum ? location.pathname.split("/").pop() : ""; // Extract the album ID from the path

  // Determine the background color based on the album's background color or default to '#121212'
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId).bgColor
      : "#121212";

  // Update the background color of the display element when the component mounts or updates
  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] mt-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {/* Render routes only if albumsData is available */}
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id === albumId)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;
