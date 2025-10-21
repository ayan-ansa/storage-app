import User from "../models/userModel.js";
import Directory from "../models/directoryModel.js";
import mongoose from "mongoose";
import Session from "../models/sessionModel.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const session = await mongoose.startSession();
  try {
    const rootDirId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    session.startTransaction();

    await Directory.insertOne(
      {
        _id: rootDirId,
        name: `root-${email}`,
        parentDirId: null,
        userId,
      },
      { session }
    );

    await User.insertOne(
      {
        _id: userId,
        name,
        email,
        password,
        rootDirId,
      },
      { session }
    );

    await session.commitTransaction();

    res.status(201).json("User Registered Successfully!");
  } catch (err) {
    await session.abortTransaction();
    if (err.code === 121) {
      return res.status(400).json({ error: "Please enter a valid value!" });
    } else if (err.code === 11000 && err.keyValue.email) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    } else {
      console.log(err);
      next(err);
    }
  } finally {
    await session.endSession();
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Invalid Credentials" });
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    const sessions = await Session.find({ userId: user.id });

    if (sessions.length >= 3) {
      await sessions[0].deleteOne();
    }

    const session = await Session.create({ userId: user._id });

    res.cookie("sid", session.id, {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });
    res.json({
      message: "User Logged In Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = (req, res) => {
  const { name, email } = req.user;
  res.status(200).json({ name, email });
};

export const logoutUser = async (req, res) => {
  const sessionId = req.signedCookies.sid;
  await Session.findByIdAndDelete(sessionId);
  res.clearCookie("sid");
  res.status(204).json().end();
};

export const logoutUserAll = async (req, res) => {
  await Session.deleteMany({ userId: req.user._id });
  res.clearCookie("sid");
  res.status(204).json().end();
};
