import { menuCreateSchema, validateRequest } from "../src/utils/validation";

describe("Menu validation", () => {
  it("accepts a valid payload", async () => {
    const payload = {
      name: "Paneer Tikka",
      category: "starter",
      description: "Smoky and spicy",
      price: 249,
      imageUrl: "https://example.com/item.jpg",
      isAvailable: true,
    };

    const result = await validateRequest(menuCreateSchema, payload);
    expect(result.valid).toBe(true);
  });

  it("rejects negative price", async () => {
    const payload = {
      name: "Paneer Tikka",
      category: "starter",
      description: "Smoky and spicy",
      price: -10,
      imageUrl: "https://example.com/item.jpg",
    };

    const result = await validateRequest(menuCreateSchema, payload);
    expect(result.valid).toBe(false);
  });
});
