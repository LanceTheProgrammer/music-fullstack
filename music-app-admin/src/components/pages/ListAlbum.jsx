import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../App"; // Assuming `url` is imported from a central configuration like `App.js`
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]); // State to hold the list of albums fetched from the server

  // Function to fetch albums data from the server
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setData(response.data.albums); // Update state with fetched albums data
      }
    } catch (error) {
      toast.error("Error occurred"); // Display toast message on error
    }
  };

  // Function to remove an album
  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message); // Display success message
        await fetchAlbums(); // Refresh the albums list after removal
      }
    } catch (error) {
      toast.error("Error occurred"); // Display toast message on error
    }
  };

  // Fetch albums data when the component mounts
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        {/* Header row for album list */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {/* Render each album in a grid */}
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img className="w-12" src={item.image} alt="" /> {/* Album image */}
              <p>{item.name}</p> {/* Album name */}
              <p>{item.desc}</p> {/* Album description */}
              <input type="color" value={item.bgColour} readOnly /> {/* Display album background color */}
              <p
                onClick={() => removeAlbum(item._id)}
                className="cursor-pointer"
              >
                x {/* Remove album button */}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;

// Lists all albums fetched from the server, displays their details, and provides a way to remove each album. the component uses useState to manage album data, useEffect to fetch data on component mount, and axios for HTTP requests to fetch albums and remove them. The component also renders each album with its image, name, description, background color, and a delete button (x) that triggers the removeAlbum function when clicked.