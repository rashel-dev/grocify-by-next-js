import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name cannot exceed 50 characters")
            .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
        email: z
            .string()
            .trim()
            .toLowerCase()
            .min(5, "Email is too short")
            .max(254, "Email is too long")
            .email("Invalid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
        confirm_password: z.string().trim().min(6, "Confirm password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });

export type RegisterInput = z.infer<typeof registerSchema>;
