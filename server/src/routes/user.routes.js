import { Router } from "express";
import { registerUser, loginUser, logoutUser, getMe, refreshAccessToken, changePassword, updateProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, getMe);
router.patch("/change-password", verifyJWT, changePassword);
router.patch("/profile", verifyJWT, updateProfile);



export default router;
