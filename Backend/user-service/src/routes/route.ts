import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  getProfile,
  updateUser,
  deleteUser,
} from "../controller/user-controller";
import { authMiddleware, authorizeRoles } from "../middleware/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshUserToken);

router.get("/profile", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateUser);
router.post("/logout", authMiddleware, logoutUser);
router.delete("/delete", authMiddleware, authorizeRoles("ADMIN"), deleteUser);

export default router;