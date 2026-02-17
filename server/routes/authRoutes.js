import express from "express";
import {
  loginUser,
  loginWithGoogle,
  logoutUser,
  logoutUserAll,
  registerUser,
} from "../controllers/authController.js";
import { checkAdmin, checkAuth } from "../middlewares/authMiddleware.js";
// import { sendOtp, verifyOtp } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/logout", checkAuth, logoutUser);

router.post("/logout-all", checkAuth, logoutUserAll);
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
router.post("/google", loginWithGoogle);

export default router;
