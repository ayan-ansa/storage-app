import OTP from "../models/otpModel.js";
import { sendOtpService } from "../services/sendOtpService.js";

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  const resData = await sendOtpService(email);
  res.status(201).json(resData);
};

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  const verifiedOtp = await OTP.findOne({ email, otp });

  if (!verifiedOtp) {
    res.status(400).json({ error: "Invalid OTP or expired" });
  }
  res.json({ message: `OTP has been verified` });
};
