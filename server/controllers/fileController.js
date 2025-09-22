import { createWriteStream } from "fs";
import { rm } from "fs/promises";
import path from "path";
import File from "../models/fileModel.js";
import Directory from "../models/directoryModel.js";

export const uploadFile = async (req, res, next) => {
  const { user, params, headers } = req;
  const parentDirId = params.parentDirId || user.rootDirId;

  try {
    const parentDirData = await Directory.findOne({
      _id: parentDirId,
      userId: user._id,
    });

    if (!parentDirData) {
      return res.status(404).json({ error: "Parent directory not found!" });
    }

    const filename = headers.filename || "untitled";
    const extension = path.extname(filename);

    const { _id } = await File.insertOne({
      name: filename,
      extension,
      parentDirId,
      userId: user._id,
    });

    const filePath = `${_id}${extension}`;

    const writeStream = createWriteStream(`./storage/${filePath}`);
    req.pipe(writeStream);

    req.on("end", async () => {
      return res.status(201).json("File Uploaded Successfully");
    });

    req.on("error", async (error) => {
      writeStream.destroy();
      await rm(`./storage/${_id}${extension}`, { force: true });
      await File.deleteOne({ _id });
      next(error);
    });
  } catch (error) {
    console.log(error);
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

    if (!fileData) return res.status(404).json({ error: "File not Found!" });

    const filePath = `${process.cwd()}/storage/${id}${fileData.extension}`;
    if (req.query.action === "download") {
      return res.download(filePath, fileData.name);
    }

    return res.sendFile(filePath, (err) => {
      if (!res.headersSent && err) {
        return res.json({ error: "Page Not Found!" });
      }
    });
  } catch (error) {
   next(error);
  }
};

export const renameFile = async (req, res, next) => {
  const { params, body, user } = req;
  const id = params.id;

  try {
    const file = await File.findOne({
      _id: id,
      userId: user._id,
    });
    if (!file) return res.status(404).json({ error: "File not Found!" });

    file.name = body.newFileName;
    file.save();

    return res.status(200).json("File Renamed Successfully");
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

export const deleteFile = async (req, res, next) => {
  const { params, user } = req;
  const id = params.id;

  try {
    const file = await File.findOne({
      _id: id,
      userId: user._id,
    }).select("extension");

    if (!file) return res.status(404).json({ error: "File not found!" });

    await rm(`./storage/${id}${file.extension}`, { force: true });
    await file.deleteOne();

    return res.json("File Deleted Successfully");
  } catch (error) {
    next(error);
  }
};
