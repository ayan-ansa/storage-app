import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import { rm } from "fs/promises";
import { canViewUser, isAuthorized } from "../utils/isAuthorized.js";
import path from "path";
import fs from "fs";

export const getUser = (req, res) => {
  const { _id, name, email, role, isDeleted, picture } = req.user;
  if (isDeleted)
    return res.status(404).json({ success: false, message: "User not found!" });

  res.status(200).json({
    success: true,
    user: { _id, name, email, role, isDeleted, picture },
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-password -rootDirId").lean();

    const sessions = await Session.find().lean();
    const userSessionIds = new Set(
      sessions.map((session) => session.userId.toString()),
    );

    const Users = allUsers.map((user) => ({
      ...user,
      isLoggedIn: userSessionIds.has(user._id.toString()),
    }));

    res.json({ success: true, users: Users });
  } catch (error) {
    console.log("Error while fetching users: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const logoutSpecificUser = async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user;
  try {
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!isAuthorized(currentUser, targetUser, true)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions to log out this user",
      });
    }

    await Session.deleteMany({ userId: userId });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const softDeleteUser = async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user;

  try {
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    //prevent self-delete
    if (currentUser._id.equals(targetUser._id)) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot delete yourself" });
    }

    if (currentUser.role !== "superadmin" && currentUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You're not authorized to soft delete this user",
      });
    }

    if (!isAuthorized(currentUser, targetUser)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions to delete this user",
      });
    }

    //check if user is already soft-deleted
    if (targetUser.isDeleted) {
      return res
        .status(400)
        .json({ success: false, message: "User is already deleted" });
    }

    await Session.deleteMany({ userId });
    await User.findByIdAndUpdate(userId, { isDeleted: true });

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting user: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const hardDeleteUser = async (req, res) => {
  const { userId } = req.params;
  const session = await mongoose.startSession();
  const currentUser = req.user;

  try {
    session.startTransaction();
    const targetUser = await User.findById(userId).session(session);
    if (!targetUser) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    //prevent self-delete
    if (currentUser._id.equals(targetUser._id)) {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ success: false, message: "You cannot delete yourself" });
    }

    // Only superadmins can hard delete, and they cannot hard delete other superadmins
    if (currentUser.role !== "superadmin" || targetUser.role === "superadmin") {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: "You are not authorized to hard delete this user",
      });
    }

    //  Perform all deletes in parallel (MUCH FASTER)
    await Promise.all([
      User.findByIdAndDelete(userId).session(session),
      Directory.deleteMany({ userId }).session(session),
      Session.deleteMany({ userId }).session(session),
    ]);
    const files = await File.find({ userId }).session(session);
    await File.deleteMany({ userId }).session(session);

    for (const { filename } of files) {
      await rm(`./storage/${filename}`, { force: true });
    }

    await session.commitTransaction();

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();

    console.log("Error while hard deleting user: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  } finally {
    await session.endSession();
  }
};

export const recoverUser = async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user;
  try {
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    if (!targetUser.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "User is not deleted",
      });
    }

    //prevent self-recover (just in case)
    if (currentUser._id.equals(targetUser._id)) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot recover yourself" });
    }

    if (currentUser.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to recover this user",
      });
    }

    await User.findByIdAndUpdate(userId, { isDeleted: false });
    res.json({
      success: true,
      message: "User recovered successfully",
    });
  } catch (error) {
    console.log("Error while recovering user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const changeUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const currentUser = req.user;
  const hierarchy = ["user", "manager", "admin", "superadmin"];

  if (!hierarchy.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Role is not valid as per the given standards",
    });
  }

  try {
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // prevent self-role-change
    if (currentUser._id.equals(targetUser._id)) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot change your own role" });
    }

    const currentLevel = hierarchy.indexOf(currentUser.role);
    const targetLevel = hierarchy.indexOf(targetUser.role);
    const newRoleLevel = hierarchy.indexOf(role);

    if (targetLevel >= currentLevel || newRoleLevel > currentLevel) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to change this user's role",
      });
    }
    targetUser.role = role;
    await targetUser.save();

    res.json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    console.log("Error while changing user role:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const disableUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    if (targetUser.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "User is already disabled",
      });
    }
    targetUser.isDeleted = true;
    await targetUser.save();
    res.json({
      success: true,
      message: "User account disabled successfully",
    });
  } catch (error) {
    console.log("Error while disabling user account:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user._id;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const targetUser = await User.findById(userId).session(session);
    if (!targetUser) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    //  Perform all deletes in parallel (MUCH FASTER)
    await Promise.all([
      User.findByIdAndDelete(userId).session(session),
      Directory.deleteMany({ userId }).session(session),
      Session.deleteMany({ userId }).session(session),
    ]);
    const files = await File.find({ userId }).session(session);
    await File.deleteMany({ userId }).session(session);

    // Delete files from storage
    for (const { filename } of files) {
      await rm(`./storage/${filename}`, { force: true });
    }

    await session.commitTransaction();

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();

    console.log("Error while hard deleting user: ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  } finally {
    await session.endSession();
  }
};

export const getSpecificUserDirectory = async (req, res) => {
  const { userId, dirId } = req.params;
  const currentUser = req.user;

  try {
    const requestedUser = await User.findById(userId)
      .select("-password -__v")
      .lean();
    if (!requestedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const userRootDirId = dirId || requestedUser.rootDirId.toString();

    const directoryData = await Directory.findOne({
      _id: userRootDirId,
      userId,
    }).lean();

    if (!directoryData) {
      return res
        .status(404)
        .json({ success: false, message: "Directory not found" });
    }

    if (!canViewUser(currentUser, requestedUser)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this user's directory",
      });
    }

    const files = await File.find({ parentDirId: directoryData._id })
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();
    const directories = await Directory.find({ parentDirId: directoryData._id })
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      ...directoryData,
      user: requestedUser,
      files,
      directories,
    });
  } catch (error) {
    console.log("Error while fetching specific user directory:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUserFile = async (req, res) => {
  const { userId, fileId } = req.params;

  try {
    const file = await File.findOne({
      _id: fileId,
      userId,
    }).select("-__v");

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found!",
      });
    }

    // check only admin and superadmin can access other user's files and same level users cannot access each other's files

    const isAuthorized = canViewUser(req.user, await User.findById(userId));
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this file",
      });
    }

    const filePath = path.join(process.cwd(), "storage", file.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found in storage!",
      });
    }

    if (req.query.action === "download") {
      return res.download(filePath, file.name);
    }

    return res.sendFile(filePath);
  } catch (error) {
    console.log("Error while fetching user file:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
