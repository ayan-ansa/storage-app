import express from "express";
import { checkAuth, checkAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  getUser,
  hardDeleteUser,
  logoutSpecificUser,
  softDeleteUser,
  recoverUser,
  changeUserRole,
  disableUser,
  deleteUser,
  getSpecificUserDirectory,
  getUserFile,
} from "../controllers/userController.js";

const router = express.Router();

// GET
router.get("/user", checkAuth, getUser);
router.delete("/users/:userId/soft", checkAuth, checkAdmin, softDeleteUser);
router.delete("/users/:userId/hard", checkAuth, checkAdmin, hardDeleteUser);
router.post("/users/:userId/logout", checkAuth, checkAdmin, logoutSpecificUser);
router.patch("/users/:userId/recover", checkAuth, checkAdmin, recoverUser);
router.patch("/users/:userId/role", checkAuth, checkAdmin, changeUserRole);
router.get("/users", checkAuth, checkAdmin, getAllUsers);
router.get(
  "/users/:userId/:dirId?",
  checkAuth,
  checkAdmin,
  getSpecificUserDirectory,
);
router.get("/users/:userId/file/:fileId", checkAuth, checkAdmin, getUserFile);
router.patch("/user/disable", checkAuth, disableUser);
router.delete("/user/delete", checkAuth, deleteUser);

export default router;
