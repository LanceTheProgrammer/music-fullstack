import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { url } from "../../App"; // Assuming `url` is imported from a central configuration like `App.js`
import { toast } from "react-toastify";

const AddAlbum = () => {
  // State variables to manage form inputs and loading state
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object to send form data including files
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColour", color);

      // Display FormData entries for debugging purposes
      console.log("FormData entries:", Object.fromEntries(formData.entries()));

      // Send POST request to server to add new album
      const response = await axios.post(`${url}/api/album/add`, formData);

      // Log response for debugging
      console.log("Response:", response);

      // Handle success or failure based on server response
      if (response.data.success) {
        toast.success("Album added successfully");
        // Clear input fields on successful addition
        setDesc("");
        setImage(null);
        setName("");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error occurred");
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return loading ? ( // Display a loading spinner while form is being submitted
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    // Form for adding a new album
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type="color"
        />
      </div>

      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;

// This component manages state using useState, handles form submission with axios for API calls, and displays a loading spinner while waiting for the server response. It also explains how form fields are rendered and managed for adding new albums.