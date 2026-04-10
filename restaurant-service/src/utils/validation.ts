import { z } from "zod";

export const menuCreateSchema = z.object({
  name: z.string().min(1, "name is required"),
  category: z.enum(["starter", "main", "dessert", "drink"], {
    message: "category must be one of starter, main, dessert, drink",
  }),
  description: z.string().min(1, "description is required"),
  price: z.coerce.number().min(0, "price must be a non-negative number"),
  imageUrl: z.string().min(1, "imageUrl is required"),
  isAvailable: z.boolean().optional().default(true),
});

export const menuUpdateSchema = menuCreateSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

export async function validateRequest(schema: z.ZodSchema, data: any) {
  try {
    const value = await schema.parseAsync(data);
    return { valid: true, data: value };
  } catch (err: any) {
    return {
      valid: false,
      error: err.errors
        ? err.errors.map((e: any) => `${e.path.join(".")}: ${e.message}`).join(", ")
        : err.message,
    };
  }
}
