import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../App"; // Assuming `url` is imported from a central configuration like `App.js`
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]); // State to hold the list of songs fetched from the server

  // Function to fetch songs data from the server
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);

      if (response.data.success) {
        setData(response.data.songs); // Update state with fetched songs data
      }
    } catch (error) {
      toast.error("Error occurred"); // Display toast message on error
    }
  };

  // Function to remove a song
  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message); // Display success message
        await fetchSongs(); // Refresh the songs list after removal
      }
    } catch (error) {
      toast.error("Error occurred"); // Display toast message on error
    }
  };

  // Fetch songs data when the component mounts
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        {/* Header row for song list */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {/* Render each song in a grid */}
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img src={item.image} className="w-12" alt="" /> {/* Song image */}
              <p>{item.name}</p> {/* Song name */}
              <p>{item.album}</p> {/* Album name */}
              <p>{item.duration}</p> {/* Song duration */}
              <p className="cursor-pointer" onClick={() => removeSong(item._id)}>
                x {/* Remove song button */}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListSong;

// Displays a list of songs fetched from the server, along with their details and a delete button (x) to remove each song. This component uses useState to manage the list of songs (data) fetched from the server, useEffect to fetch data on component mount, and axios for HTTP requests to fetch songs and remove them. Each song is rendered with its image, name, associated album, duration, and a delete button (x) that triggers the removeSong function when clicked.