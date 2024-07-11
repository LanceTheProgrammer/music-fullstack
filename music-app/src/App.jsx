import React, { useContext, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  // Use the PlayerContext to access the audioRef, track, and songsData
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? ( // Check if there are any songs available
        <>
          <div className="h-[90%] flex">
            {/* Render the Sidebar component */}
            <Sidebar />
            {/* Render the Display component */}
            <Display />
          </div>
          {/* Render the Player component */}
          <Player />
        </>
      ) : null}

      {/* Render the audio element and set its source to the current track's file */}
      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
};

export default App;
