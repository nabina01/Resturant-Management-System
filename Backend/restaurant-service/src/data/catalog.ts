export interface RestaurantInfo {
  id: string;
  name: string;
  slogan: string;
  description: string;
  location: string;
  phone: string;
  openHours: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: "starter" | "main" | "dessert" | "drink";
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

export const restaurantInfo: RestaurantInfo = {
  id: "rms-restaurant-1",
  name: "Saffron Table",
  slogan: "Fresh fire, bold flavor",
  description:
    "Saffron Table serves modern comfort food built from local ingredients, charcoal grilling, and seasonal recipes.",
  location: "Downtown, City Center",
  phone: "+91 90000 12345",
  openHours: "Mon-Sun, 10:00 AM - 11:00 PM",
};

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Smoked Tomato Soup",
    category: "starter",
    description: "Roasted tomato soup with basil oil and toasted sourdough.",
    price: 149,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
  },
  {
    id: "m2",
    name: "Charcoal Paneer Tikka",
    category: "starter",
    description: "Paneer cubes marinated in hung curd and house spices.",
    price: 229,
    imageUrl:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
  },
  {
    id: "m3",
    name: "Butter Chicken Bowl",
    category: "main",
    description: "Creamy tomato gravy, tandoori chicken, and saffron rice.",
    price: 329,
    imageUrl:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
  },
  {
    id: "m4",
    name: "Garden Herb Pasta",
    category: "main",
    description: "Penne pasta in basil pesto with roasted vegetables.",
    price: 279,
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
  },
  {
    id: "m5",
    name: "Baked Cheesecake",
    category: "dessert",
    description: "Vanilla cheesecake with berry compote.",
    price: 189,
    imageUrl:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
  },
  {
    id: "m6",
    name: "Mint Lime Cooler",
    category: "drink",
    description: "Fresh lime, mint, and sparkling water.",
    price: 99,
    imageUrl:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    isAvailable: true,
  },
];
