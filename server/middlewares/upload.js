import multer from "multer";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

if (!fs.existsSync("storage")) {
  fs.mkdirSync("storage");
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/"); // folder must exist
  },
  filename: function (req, file, cb) {
    const randomId = new mongoose.Types.ObjectId();
    const ext = path.extname(file.originalname);
    file.id = randomId; // Store the generated ID in the file object for later use
    cb(null, `${randomId}${ext}`);
  },
});

const limits = {
  fileSize: 200 * 1024 * 1024, //200MB
};

export const upload = multer({ storage, limits });
