import { Request, Response } from "express";
import { menuItems, restaurantInfo } from "../data/catalog";

export const getRestaurantInfo = (_req: Request, res: Response) => {
  return res.json(restaurantInfo);
};

export const getMenu = (_req: Request, res: Response) => {
  return res.json(menuItems);
};
