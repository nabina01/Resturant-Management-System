import { Router } from "express";
import { registerUser } from "../controller/register.controller";
import { loginUser } from "../controller/login.controller";
import { refreshUserToken } from "../controller/refresh.controller";
import { logoutUser } from "../controller/logout.controller";
import { getProfile } from "../controller/profile.controller";
import { updateUser } from "../controller/updateProfile.controller";
import { deleteUser } from "../controller/delete.controller";
import { authMiddleware, authorizeRoles } from "../middleware/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshUserToken);

router.get("/profile", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateUser);
router.post("/logout", authMiddleware, logoutUser);
router.delete("/delete", authMiddleware, deleteUser);

export default router;