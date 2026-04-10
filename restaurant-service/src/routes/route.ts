import { Router } from "express";
import {
	createMenuItem,
	deleteMenuItem,
	getMenu,
	getMenuItemById,
	getRestaurantInfo,
	updateMenuItem,
} from "../controller/restaurant-controller";
import { requireAdminKey } from "../middleware/auth";

const router = Router();

router.get("/restaurant", getRestaurantInfo);
router.get("/menu", getMenu);
router.get("/menu/:id", getMenuItemById);
router.post("/menu", requireAdminKey, createMenuItem);
router.put("/menu/:id", requireAdminKey, updateMenuItem);
router.delete("/menu/:id", requireAdminKey, deleteMenuItem);

export default router;
