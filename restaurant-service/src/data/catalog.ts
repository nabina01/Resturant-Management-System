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

type MenuSeedItem = Omit<MenuItem, "id" | "imageUrl" | "isAvailable"> & {
  imageFile: string;
};

const menuSeedItems: MenuSeedItem[] = [
  { name: "Affogato", category: "dessert", description: "Vanilla ice cream with a hot espresso shot.", price: 170, imageFile: "Affogato.jpeg" },
  { name: "Americano", category: "drink", description: "Classic espresso diluted with hot water.", price: 120, imageFile: "Americano.jpeg" },
  { name: "Americano Double Shot", category: "drink", description: "A stronger americano made with a double espresso shot.", price: 150, imageFile: "AmericanoDoubleShot.jpeg" },
  { name: "Banana Lassi", category: "drink", description: "Sweet and creamy banana yogurt drink.", price: 145, imageFile: "BananaLassi.jpeg" },
  { name: "Berry Smoothie", category: "drink", description: "Mixed berry smoothie served chilled.", price: 160, imageFile: "BerrySmoothie.jpeg" },
  { name: "Black Tea", category: "drink", description: "Freshly brewed strong black tea.", price: 70, imageFile: "BlackTea.jpeg" },
  { name: "Brownie", category: "dessert", description: "Warm chocolate brownie with rich cocoa flavor.", price: 130, imageFile: "brownie.jpeg" },
  { name: "Burger", category: "main", description: "Loaded grilled burger with house sauce and crisp veggies.", price: 220, imageFile: "burger.jpg" },
  { name: "Cappuccino", category: "drink", description: "Espresso topped with steamed milk and foam.", price: 140, imageFile: "Cappuccino.jpeg" },
  { name: "Cheese Pasta", category: "main", description: "Creamy cheese pasta with herbs.", price: 240, imageFile: "cheese pasta.jpg" },
  { name: "Chocolate Milkshake", category: "drink", description: "Creamy chocolate shake blended with chilled milk.", price: 170, imageFile: "ChocolateMilkshake.jpeg" },
  { name: "Classic Sandwich", category: "main", description: "Toasted sandwich with fresh fillings and cheese.", price: 180, imageFile: "classic-sandwich.png" },
  { name: "Coke", category: "drink", description: "Chilled carbonated cola drink.", price: 60, imageFile: "Coke.jpeg" },
  { name: "Cookie", category: "dessert", description: "Fresh baked butter cookie.", price: 90, imageFile: "Cookie.jpeg" },
  { name: "Croissant", category: "dessert", description: "Flaky and buttery baked croissant.", price: 110, imageFile: "croissant.jpeg" },
  { name: "Dew", category: "drink", description: "Lemon-lime sparkling soft drink.", price: 60, imageFile: "Dew.jpeg" },
  { name: "Donut", category: "dessert", description: "Soft donut with sweet glaze.", price: 95, imageFile: "Donut.jpeg" },
  { name: "Double Shot Espresso", category: "drink", description: "Rich and intense double-shot espresso.", price: 130, imageFile: "DoubleShotEspresso.jpeg" },
  { name: "Espresso Coffee", category: "drink", description: "Strong single-shot espresso coffee.", price: 110, imageFile: "espresso-coffee.jpeg" },
  { name: "Frooti", category: "drink", description: "Refreshing mango fruit drink.", price: 50, imageFile: "Frooti.jpeg" },
  { name: "Green Tea", category: "drink", description: "Light and soothing brewed green tea.", price: 80, imageFile: "GreenTea.jpeg" },
  { name: "Hot Chocolate", category: "drink", description: "Rich cocoa drink served hot.", price: 150, imageFile: "HotChocolate.jpeg" },
  { name: "Hot Lemon", category: "drink", description: "Warm lemon drink for a citrusy refresh.", price: 85, imageFile: "HotLemon.jpeg" },
  { name: "Iced Coffee", category: "drink", description: "Cold coffee poured over ice.", price: 140, imageFile: "IcedCoffee.jpeg" },
  { name: "Iced Lemon Tea", category: "drink", description: "Brewed lemon tea served with ice.", price: 110, imageFile: "IcedLemonTea.jpeg" },
  { name: "Iced Mint Tea", category: "drink", description: "Mint tea chilled with ice.", price: 110, imageFile: "IcedMintTea.jpeg" },
  { name: "Latte Coffee", category: "drink", description: "Smooth latte coffee with steamed milk.", price: 145, imageFile: "latte-coffee.png" },
  { name: "Latte", category: "drink", description: "Mild espresso with steamed milk.", price: 145, imageFile: "latte.jpeg" },
  { name: "Lemonade", category: "drink", description: "Classic fresh lemonade.", price: 90, imageFile: "Lemonade.jpeg" },
  { name: "Lemon Soda", category: "drink", description: "Sparkling lemon soda served chilled.", price: 95, imageFile: "Lemonsoda.jpeg" },
  { name: "Lemon Tea", category: "drink", description: "Hot tea infused with lemon.", price: 85, imageFile: "LemonTea.jpeg" },
  { name: "Lemony Fruit Cooler", category: "drink", description: "Citrus fruit cooler with a lemony twist.", price: 130, imageFile: "LemonyFruitColler.jpeg" },
  { name: "Macchiato", category: "drink", description: "Bold espresso marked with milk foam.", price: 140, imageFile: "Macchiato.jpeg" },
  { name: "Mango Banana Fusion", category: "drink", description: "Mango and banana fruit blend.", price: 165, imageFile: "MangoBananaFP.jpeg" },
  { name: "Mango Lassi", category: "drink", description: "Traditional mango yogurt lassi.", price: 150, imageFile: "MangoLassi.jpeg" },
  { name: "Mango Milkshake", category: "drink", description: "Thick mango shake blended until creamy.", price: 175, imageFile: "MangoMilkshake.jpeg" },
  { name: "Mango Punch", category: "drink", description: "Refreshing mango punch.", price: 120, imageFile: "MangoPunch.jpeg" },
  { name: "Mango Smoothie", category: "drink", description: "Chilled mango smoothie.", price: 165, imageFile: "MangoSmoothie.jpeg" },
  { name: "Mocha Frappuccino", category: "drink", description: "Mocha flavored blended iced coffee.", price: 180, imageFile: "MochaFrappuccino.jpeg" },
  { name: "Muffin", category: "dessert", description: "Soft baked muffin, perfect with coffee.", price: 100, imageFile: "Muffin.jpeg" },
  { name: "Orange Pineapple", category: "drink", description: "Citrus pineapple cooler.", price: 125, imageFile: "OrangePineapple.jpeg" },
  { name: "Pastry Croissant", category: "dessert", description: "Fresh pastry croissant with buttery layers.", price: 120, imageFile: "pastry-croissant.jpg" },
  { name: "Peach Iced Tea", category: "drink", description: "Peach flavored tea served over ice.", price: 130, imageFile: "PeachIcedTea.jpeg" },
  { name: "Pepsi", category: "drink", description: "Classic chilled cola drink.", price: 60, imageFile: "Pepsi.jpeg" },
  { name: "Pineapple Orange Punch", category: "drink", description: "Tropical pineapple and orange punch.", price: 130, imageFile: "PineapleOrangePunch.jpeg" },
  { name: "Pizza", category: "main", description: "Cheesy oven baked pizza with toppings.", price: 280, imageFile: "pizza.jpg" },
  { name: "Sandwich", category: "main", description: "Grilled sandwich with crunchy veggies.", price: 170, imageFile: "sandwich.jpg" },
  { name: "Sprite", category: "drink", description: "Lemon-lime sparkling drink served chilled.", price: 60, imageFile: "Sprite.jpeg" },
  { name: "Strawberry Lemon Cooler", category: "drink", description: "Strawberry and lemon mixed cooler.", price: 140, imageFile: "StrawberryLemonCooler.jpeg" },
  { name: "Strawberry Milkshake", category: "drink", description: "Sweet and creamy strawberry milkshake.", price: 170, imageFile: "StrawberryMilkshake.jpeg" },
  { name: "Sweet Lassi", category: "drink", description: "Classic sweet yogurt lassi.", price: 130, imageFile: "SweetLassi.jpeg" },
  { name: "Vanilla Milkshake", category: "drink", description: "Smooth vanilla flavored milkshake.", price: 165, imageFile: "VanillaMilkshake.jpeg" },
  { name: "French Fries", category: "starter", description: "Crispy golden fries with seasoning.", price: 120, imageFile: "vecteezy_ai-generated-a-plate-of-crispy-golden-french-fries-at-a_39655174.jpg" },
];

export const menuItems: MenuItem[] = menuSeedItems.map((item, index) => ({
  id: `m${index + 1}`,
  name: item.name,
  category: item.category,
  description: item.description,
  price: item.price,
  imageUrl: `/${item.imageFile}`,
  isAvailable: true,
}));
