import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom"; // Importing necessary components from react-router-dom
import AddSong from "./components/pages/AddSong"; // Importing components for each route
import AddAlbum from "./components/pages/AddAlbum";
import ListSong from "./components/pages/ListSong";
import ListAlbum from "./components/pages/ListAlbum";
import Sidebar from "./components/Sidebar"; // Sidebar component for navigation
import Navbar from "./components/Navbar"; // Navbar component for navigation and UI consistency

export const url = 'http://localhost:4000'; // Base URL for API requests

const App = () => {
  return (
    <div className="flex items-start min-h-screen"> {/* Flex container for layout */}
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
      <Sidebar /> {/* Sidebar for navigation */}
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]"> {/* Main content area */}
        <Navbar /> {/* Navbar for navigation and UI consistency */}
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12"> {/* Padding for content */}
          <Routes> {/* Routes configuration */}
            <Route path="/add-song" element={<AddSong />} /> {/* Route for adding a song */}
            <Route path="/add-album" element={<AddAlbum />} /> {/* Route for adding an album */}
            <Route path="/list-song" element={<ListSong />} /> {/* Route for listing songs */}
            <Route path="/list-album" element={<ListAlbum />} /> {/* Route for listing albums */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

// Sets up a basic layout for a single-page application using React Router. It includes routes for adding songs and albums, listing songs and albums, and incorporates a sidebar and navbar for navigation and UI consistency. This setup allows for a structured and navigable single-page application where users can manage songs and albums efficiently.