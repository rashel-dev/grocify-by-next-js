import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .max(254, "Email is too long")
        .email("Invalid email address"),
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .max(128, "Password cannot exceed 128 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;