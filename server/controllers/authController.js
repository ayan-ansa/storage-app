// import OTP from "../models/otpModel.js";
// import Session from "../models/sessionModel.js";
import mongoose from "mongoose";
import { verifyIdToken } from "../services/googleService.js";
import Directory from "../models/directoryModel.js";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
// import { sendOtpService } from "../services/sendOtpService.js";

// export const sendOtp = async (req, res, next) => {
//   const { email } = req.body;
//   const resData = await sendOtpService(email);
//   res.status(201).json(resData);
// };

// export const verifyOtp = async (req, res, next) => {
//   const { email, otp } = req.body;
//   const verifiedOtp = await OTP.findOne({ email, otp });

//   if (!verifiedOtp) {
//     res.status(400).json({ error: "Invalid OTP or expired" });
//   }
//   res.json({ message: `OTP has been verified` });
// };

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ success: false, message: "User with already exists" });
  }
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
      { session },
    );

    await User.insertOne(
      {
        _id: userId,
        name,
        email,
        password,
        rootDirId,
      },
      { session },
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (err) {
    await session.abortTransaction();
    if (err.code === 121) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid value!" });
    } else if (err.code === 11000 && err.keyValue.email) {
      return res
        .status(409)
        .json({ success: false, message: "User with already exists" });
    } else {
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
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const userSessions = await Session.find({ userId: user.id });

    if (userSessions.length >= 3) {
      await userSessions[0].deleteOne();
    }

    const newSession = await Session.create({ userId: user._id });

    res.cookie("sid", newSession.id, {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const loginWithGoogle = async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Google ID token" });
  }

  const mongooseSession = await mongoose.startSession();
  try {
    const { name, email, picture } = await verifyIdToken(idToken);
    let user = await User.findOne({ email }).select("-__v").lean();
    if (!user) {
      const userId = new mongoose.Types.ObjectId();
      const rootDirId = new mongoose.Types.ObjectId();

      mongooseSession.startTransaction();

      await Directory.insertOne(
        {
          _id: rootDirId,
          name: `root-${email}`,
          parentDirId: null,
          userId,
        },
        { mongooseSession },
      );

      user = await User.insertOne(
        {
          _id: userId,
          name,
          email,
          picture,
          rootDirId,
        },
        { mongooseSession },
      );

      await mongooseSession.commitTransaction();
    } else if (user.isDeleted) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deleted. Please contact admin",
      });
    }

    const userSessions = await Session.find({ userId: user._id });

    if (userSessions.length >= 3) {
      await userSessions[0].deleteOne();
    }

    const newSession = await Session.create({ userId: user._id });

    res.cookie("sid", newSession.id, {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
    });
  } catch (err) {
    await mongooseSession.abortTransaction();
    res.status(500).json({
      success: false,
      message: "Server error during Google login",
    });
  } finally {
    await mongooseSession.endSession();
  }
};

// current device logout
export const logoutUser = async (req, res) => {
  const sessionId = req.signedCookies.sid;
  try {
    await Session.findByIdAndDelete(sessionId);
    res.clearCookie("sid");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// all device logout
export const logoutUserAll = async (req, res) => {
  try {
    await Session.deleteMany({ userId: req.user._id });
    res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
