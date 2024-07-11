import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({storage})

export default upload;

// This setup allows you to manage file uploads using multer efficiently, providing flexibility to handle different types of files and integrate them into your application's backend operations.