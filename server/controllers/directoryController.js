import { rm } from "fs/promises";
import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";

// Create Directory
export const createDirectory = async (req, res, next) => {
  const parentDirId = req.params.parentDirId || req.user.rootDirId;

  const dirName = req.body.dirname || "New Folder";

  try {
    const parentDir = await Directory.findById({
      _id: parentDirId,
    });

    if (!parentDir)
      return res
        .status(404)
        .json({ success: false, message: "Parent directory not found!" });

    await Directory.insertOne({
      name: dirName,
      userId: req.user._id,
      parentDirId,
    });

    res.json({ success: true, message: "Directory created successfully" });
  } catch (err) {
    if (err.code === 121)
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid value!" });
    next(err);
  }
};

// Get Directory
export const getDirectory = async (req, res, next) => {
  const _id = req.params.id || req.user.rootDirId;

  try {
    const directoryData = await Directory.findById({ _id }).lean();

    if (!directoryData) {
      return res.status(404).json({
        success: false,
        message: "Directory not found or you do not have access to it!",
      });
    }
    const files = await File.find({ parentDirId: directoryData._id })
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();
    const directories = await Directory.find({ parentDirId: _id })
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      ...directoryData,
      files: files.map((file) => ({ ...file, type: "file" })),
      directories: directories.map((dir) => ({ ...dir, type: "directory" })),
    });
  } catch (err) {
    next(err);
  }
};

// Rename Directory
export const renameDirectory = async (req, res, next) => {
  const newDirName = req.body.name;

  try {
    await Directory.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name: newDirName },
    );
    res
      .status(200)
      .json({ success: true, message: "Directory renamed successfully" });
  } catch (err) {
    if (err.code === 121)
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid value!" });
    next(err);
  }
};

// Delete Directory
export const deleteDirectory = async (req, res, next) => {
  const id = req.params.id;
  const directoryCount = await Directory.countDocuments({
    _id: id,
    userId: req.user._id,
  });

  if (!directoryCount)
    return res
      .status(404)
      .json({ success: false, message: "Directory not found!" });

  try {
    const getDirectoryData = async (dirId) => {
      const directories = await Directory.find({ parentDirId: dirId })
        .select("_id")
        .lean();

      const files = await File.find({ parentDirId: dirId })
        .select("filename")
        .lean();

      let dirsToDelete = [...directories];
      let filesToDelete = [...files];

      for (const { _id } of directories) {
        const { dirs, files } = await getDirectoryData(_id);
        dirsToDelete = [...dirsToDelete, ...dirs];
        filesToDelete = [...filesToDelete, ...files];
      }

      return { dirs: dirsToDelete, files: filesToDelete };
    };

    const { dirs, files } = await getDirectoryData(id);

    await Directory.deleteMany({
      _id: { $in: [...dirs.map(({ _id }) => _id), id] },
    });

    await File.deleteMany({
      _id: { $in: files.map(({ _id }) => _id) },
    });

    for (const { filename } of files) {
      await rm(`./storage/${filename}`, { force: true });
    }

    res
      .status(200)
      .json({ success: true, message: "Directory deleted successfully" });
  } catch (error) {
    next(error);
  }
};
