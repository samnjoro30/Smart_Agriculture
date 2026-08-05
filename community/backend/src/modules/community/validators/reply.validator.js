import { z } from "zod";

export const createReplySchema = z.object({
    userId: z
        .string()
        .trim()
        .min(1, "User ID is required"),

    discussionId: z
        .string()
        .trim()
        .min(1, "Discussion ID is required"),

    replyToId: z
        .string()
        .trim()
        .optional(),

    message: z
        .string()
        .trim()
        .min(2, "Reply must contain at least 2 characters")
        .max(5000, "Reply is too long"),
});