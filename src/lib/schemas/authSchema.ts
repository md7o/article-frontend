// lib/validation/authSchema.ts
import { z } from "zod";

// ✅ Base schema used for both login & signup
export const baseAuthSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    // .regex(/[A-Z]/, { message: "Must include at least one uppercase letter." })
    .regex(/\d/, { message: "Must include at least one number." }),
});

// ✅ Login schema (same as base)
export const loginSchema = baseAuthSchema;
export type LoginFormData = z.infer<typeof loginSchema>;

// ✅ Signup schema (extends base with `username`)
export const signupSchema = baseAuthSchema.extend({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 character." })
    .max(15, { message: "Username can’t exceed 15 characters." }),
});
export type SignupFormData = z.infer<typeof signupSchema>;
