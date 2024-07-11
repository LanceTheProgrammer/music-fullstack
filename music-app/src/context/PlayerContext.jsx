import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Create a context to manage the state and functions related to the player
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  // Create references for the audio element and the seek bar elements
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  // Base URL for API requests
  const url = "http://localhost:4000";

  // State to store the list of songs, albums, the current track, and play status
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null); // Initially, no track is selected
  const [playStatus, setPlayStatus] = useState(false);
  
  // State to store the current and total time of the track
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // Function to play the current track
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Function to pause the current track
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // Function to play a track by its ID
  const playWithId = async (id) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    });

    await audioRef.current.play();
    setPlayStatus(true);
  };

  // Function to play the previous track in the list
  const previous = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play;
        setPlayStatus(true);
      }
    });
  };

  // Function to play the next track in the list
  const next = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index < songsData.length) {
        await setTrack(songsData[index + 1]);
        await audioRef.current.play;
        setPlayStatus(true);
      }
    });
  };

  // Function to seek to a specific time in the track
  const seekSong = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  // Function to fetch the list of songs from the API
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      if (response.data.songs.length > 0) {
        setTrack(response.data.songs[0]); // Set initial track if songs exist
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  // Function to fetch the list of albums from the API
  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  // useEffect to update the current time of the track as it plays
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current && seekBar.current) {
        seekBar.current.style.width = `${Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        )}%`;
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      }
    };

    // Setup time update listener
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime);
    }

    // Cleanup listener on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [audioRef, seekBar]);

  // useEffect to fetch songs and albums data on component mount
  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  // Context value to be provided to the components
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  // Provide the context value to the children components
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
