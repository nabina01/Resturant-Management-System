import { Router } from "express";
import { getMenu, getRestaurantInfo } from "../controller/restaurant-controller";

const router = Router();

router.get("/restaurant", getRestaurantInfo);
router.get("/menu", getMenu);

export default router;
