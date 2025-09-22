import express from "express";

import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import {
  deleteFile,
  getFile,
  renameFile,
  uploadFile,
} from "../controllers/fileController.js";

export const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

//Create
router.post("/:parentDirId?", uploadFile);

//Read, Update, Delete
router.route("/:id").get(getFile).patch(renameFile).delete(deleteFile);


export default router;
