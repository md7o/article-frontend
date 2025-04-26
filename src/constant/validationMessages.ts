// src/constant/validationMessages.ts
export type ValidationKey =
  | "emailRequired"
  | "emailInvalid"
  | "passwordRequired"
  | "passwordMinLength"
  | "usernameRequired";

export const validationMessages: Record<ValidationKey, string> = {
  emailRequired: "Email is required",
  emailInvalid: "Please enter a valid email address",
  passwordRequired: "Password is required",
  passwordMinLength: "Password must be at least 8 characters",
  usernameRequired: "Username is required",
};
