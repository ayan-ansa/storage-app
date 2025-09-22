import { rm } from "fs/promises";
import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";

// Create Directory
export const createDirectory = async (req, res, next) => {
  const { user, params, headers } = req;

  const parentDirId = params.parentDirId || user.rootDirId;

  const dirname = headers.dirname || "New Folder";

  try {
    const parentDir = await Directory.findById({
      _id: parentDirId,
    });

    if (!parentDir)
      return res
        .status(404)
        .json({ message: "Parent Directory Does not exist!" });

    await Directory.insertOne({
      name: dirname,
      userId: user._id,
      parentDirId,
    });

    res.json("Directory Created Successfully");
  } catch (err) {
    if (err.code === 121)
      return res.status(400).json({ error: "Please enter a valid value!" });
    next(err);
  }
};

// Get Directory
export const getDirectory = async (req, res) => {
  const { user, params } = req;
  const _id = params.id || user.rootDirId;

  try {
    const directoryData = await Directory.findById({ _id }).lean();

    if (!directoryData) {
      return res.status(404).json({
        error: "Directory not found or you do not have access to it!",
      });
    }
    const files = await File.find({ parentDirId: directoryData._id }).lean();
    const directories = await Directory.find({ parentDirId: _id }).lean();

    return res.json({
      ...directoryData,
      files: files.map((file) => ({ ...file, id: file._id })),
      directories: directories.map((dir) => ({ ...dir, id: dir._id })),
    });
  } catch (err) {
    next(err);
  }
};

// Rename Directory
export const renameDirectory = async (req, res, next) => {
  const { user, params } = req;
  const { newDirName } = req.body;
  const id = params.id;

  try {
    await Directory.findOneAndUpdate(
      { _id: id, userId: user._id },
      { name: newDirName }
    );
    res.status(200).json("Directory Renamed Successfully");
  } catch (err) {
    if (err.code === 121)
      return res.status(400).json({ error: "Please enter a valid value!" });
    next(err);
  }
};

// Delete Directory
export const deleteDirectory = async (req, res, next) => {
  const { user, params } = req;
  const id = params.id;

  const directoryCount = await Directory.countDocuments({
    _id: id,
    userId: user._id,
  });

  if (!directoryCount)
    return res.status(404).json({ message: "Directory not found!" });

  try {
    const getDirectoryData = async (dirId) => {
      const directories = await Directory.find({ parentDirId: dirId })
        .select("_id")
        .lean();

      const files = await File.find({ parentDirId: dirId })
        .select("extension")
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

    for (const { _id, extension } of files) {
      await rm(`./storage/${_id}${extension}`, { force: true });
    }

    res.status(200).json({ message: "Directory deleted successfully" });
  } catch (error) {
    next(error);
  }
};
