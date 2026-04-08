import { Request, Response } from "express";
import { MenuItem, menuItems, restaurantInfo } from "../data/catalog";
import { menuCreateSchema, menuUpdateSchema, validateRequest } from "../utils/validation";

export const getRestaurantInfo = (_req: Request, res: Response) => {
  return res.json(restaurantInfo);
};

export const getMenu = (_req: Request, res: Response) => {
  return res.json(menuItems);
};

export const getMenuItemById = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const item = menuItems.find((menuItem) => menuItem.id === id);

  if (!item) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  return res.json(item);
};

export const createMenuItem = (req: Request, res: Response) => {
  return validateRequest(menuCreateSchema, req.body).then((parsed) => {
    if (!parsed.valid || !parsed.data) {
      return res.status(400).json({ message: parsed.error });
    }

    const payload = parsed.data as Omit<MenuItem, "id">;
    const nextId = `m${Date.now()}`;

    const newItem: MenuItem = {
      id: nextId,
      ...payload,
      isAvailable: payload.isAvailable ?? true,
    };

    menuItems.push(newItem);
    return res.status(201).json(newItem);
  });
};

export const updateMenuItem = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const index = menuItems.findIndex((menuItem) => menuItem.id === id);

  if (index < 0) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  return validateRequest(menuUpdateSchema, req.body).then((parsed) => {
    if (!parsed.valid || !parsed.data) {
      return res.status(400).json({ message: parsed.error });
    }

    const updatedItem: MenuItem = {
      ...menuItems[index],
      ...(parsed.data as Partial<MenuItem>),
    };

    menuItems[index] = updatedItem;
    return res.json(updatedItem);
  });
};

export const deleteMenuItem = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const index = menuItems.findIndex((menuItem) => menuItem.id === id);

  if (index < 0) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  const [deleted] = menuItems.splice(index, 1);
  return res.json({ message: "Menu item deleted", item: deleted });
};
