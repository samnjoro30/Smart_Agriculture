import { z } from "zod";

export const createDiscussionSchema = z.object({
    userId: z
        .string({
            error: "User ID is required",
        })
        .trim()
        .min(1, "User ID is required"),

    title: z
        .string({
            error: "Title is required",
        })
        .trim()
        .min(5, "Title must be at least 5 characters")
        .max(200, "Title cannot exceed 200 characters"),

    body: z
        .string({
            error: "Body is required",
        })
        .trim()
        .min(10, "Body must be at least 10 characters")
        .max(10000, "Body cannot exceed 10000 characters"),

    categoryId: z
        .string({
            error: "Category ID is required",
        })
        .trim()
        .min(1, "Category ID is required"),
});