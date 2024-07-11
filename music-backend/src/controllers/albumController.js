import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColour } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      console.error("No image file uploaded");
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColour,
      image: imageUpload.secure_url,
    };

    const album = new albumModel(albumData);
    await album.save();

    console.log("Album added successfully:", albumData);
    res.json({ success: true, message: "Album added successfully" });
  } catch (error) {
    console.error("Error adding album:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.json({ success: true, albums: allAlbums });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Album removed" });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};

export { addAlbum, listAlbum, removeAlbum };

// These functions provide basic CRUD functionalities for managing albums in your application, integrating Cloudinary for image storage and retrieval along with MongoDB for data persistence.