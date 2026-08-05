import { z } from "zod";

const categorySchema = z.object({
    name: z
        .string({
            error: "Category name is required",
        })
        .trim()
        .min(3, "Category name must be at least 3 characters")
        .max(100, "Category name cannot exceed 100 characters"),

    description: z
        .string({
            error: "Description is required",
        })
        .trim()
        .min(5, "Description must be at least 5 characters")
        .max(500, "Description cannot exceed 500 characters"),
});

export const createCategorySchema = z
    .union([
        categorySchema,
        z.array(categorySchema).min(1, "At least one category is required"),
    ])
    .transform((data) => (Array.isArray(data) ? data : [data]));