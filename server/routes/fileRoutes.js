import express from "express";

import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import {
  deleteFile,
  getFile,
  renameFile,
  uploadFile,
} from "../controllers/fileController.js";
import { upload } from "../middlewares/upload.js";

export const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

// Multiple files
router.post("/multiple/:parentDirId?", upload.array("files", 10), uploadFile);

// Single file
router.post("/:parentDirId?", upload.single("file"), uploadFile);

//Read, Update, Delete
router.route("/:id").get(getFile).patch(renameFile).delete(deleteFile);

export default router;
