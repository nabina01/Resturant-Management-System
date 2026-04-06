import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  getProfile,
  updateUser,
  deleteUser,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
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

router.post("/address", authMiddleware, addAddress);
router.get("/address", authMiddleware, getAddresses);
router.put("/address/:id", authMiddleware, updateAddress);
router.delete("/address/:id", authMiddleware, deleteAddress);
router.patch("/address/default/:id", authMiddleware, setDefaultAddress);

export default router;