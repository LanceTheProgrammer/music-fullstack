import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { url } from "../../App"; // Assuming `url` is imported from a central configuration like `App.js`
import { toast } from "react-toastify";

const AddSong = () => {
  // State variables to manage form inputs and loading state
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

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
      formData.append("audio", song);
      formData.append("album", album);

      // Send POST request to server to add new song
      const response = await axios.post(`${url}/api/song/add`, formData);

      // Handle success or failure based on server response
      if (response.data.success) {
        toast.success("Song Added");
        // Clear input fields on successful addition
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(null);
        setSong(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occurred");
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  // Function to fetch album data from the server
  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error("Unable to load albums data");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  // Load album data on component mount
  useEffect(() => {
    loadAlbumData();
  }, []);

  return loading ? ( // Display a loading spinner while form is being submitted
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    // Form for adding a new song
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex gap-8">
        {/* Upload Song section */}
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              alt=""
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
        {/* Upload Image section */}
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
              src={
                image ? URL.createObjectURL(image) : assets.upload_area
              }
              alt=""
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
      </div>
      {/* Song name input */}
      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
          required
        />
      </div>
      {/* Song description input */}
      <div className="flex flex-col gap-2.5">
        <p>Song description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
          required
        />
      </div>
      {/* Album selection dropdown */}
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          defaultValue={album}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
          {albumData.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {/* Submit button */}
      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;

// This component facilitates the addition of new songs, allowing users to upload audio files, select an album, input song details like name and description, and submit the form.