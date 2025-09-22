import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import { getUser, loginUser, logoutUser, logoutUserAll, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/", checkAuth, getUser);

router.post("/logout", checkAuth,logoutUser);
router.post("/logout-all", checkAuth,logoutUserAll);

export default router;
