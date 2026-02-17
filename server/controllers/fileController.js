import { rm } from "fs/promises";
import path from "path";
import fs from "fs";
import File from "../models/fileModel.js";
import Directory from "../models/directoryModel.js";

export const uploadFile = async (req, res, next) => {
  try {
    const parentDirId = req.params.parentDirId || req.user.rootDirId;

    const parentDirData = await Directory.findOne({
      _id: parentDirId,
      userId: req.user._id,
    });

    if (!parentDirData) {
      return res
        .status(404)
        .json({ success: false, message: "Parent directory not found!" });
    }

    // Normalize single & multiple
    const files = req.files || [req.file];

    if (!files.length) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    for (const file of files) {
      console.log("Processing file:", file);
      const { originalname, filename, path, mimetype, size, id } = file;

      await File.create({
        _id: id,
        name: originalname,
        filename,
        path,
        mimeType: mimetype,
        size,
        parentDirId,
        userId: req.user._id,
      });
    }

    res.status(201).json({
      success: true,
      message: "File(s) uploaded successfully",
    });
  } catch (error) {
    console.log("Error in uploadFile controller:", error);
    next(error);
  }
};

export const getFile = async (req, res) => {
  const { params, user } = req;
  const id = params.id;

  try {
    const fileData = await File.findOne({
      _id: id,
      userId: user._id,
    });

    if (!fileData)
      return res
        .status(404)
        .json({ success: false, message: "File not Found!" });

    const filePath = path.join(process.cwd(), "storage", fileData.filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File missing on server",
      });
    }

    if (req.query.action === "download") {
      return res.download(filePath, fileData.name);
    }

    return res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

export const renameFile = async (req, res, next) => {
  const id = req.params.id;
  const newFileName = req.body.name;

  try {
    const file = await File.findOne({
      _id: id,
      userId: req.user._id,
    });
    if (!file)
      return res
        .status(404)
        .json({ success: false, message: "File not Found!" });

    file.name = newFileName;
    file.save();

    return res
      .status(200)
      .json({ success: true, message: "File renamed successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  const id = req.params.id;
  try {
    const file = await File.findOne({
      _id: id,
      userId: req.user._id,
    }).select("filename");

    if (!file)
      return res
        .status(404)
        .json({ success: false, message: "File not found!" });

    await rm(`./storage/${file.filename}`, { force: true });
    await file.deleteOne();

    return res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};
