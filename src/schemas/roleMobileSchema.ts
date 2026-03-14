import { z } from "zod";

export const roleMobileSchema = z.object({
    role: z.enum(["user", "rider", "admin"]),
    mobile: z
        .string()
        .trim()
        .length(11, "Mobile number must be 11 digits")
        .regex(/^01[3-9]\d{8}$/, "Invalid mobile number"),
});
export type RoleMobileInput = z.infer<typeof roleMobileSchema>;