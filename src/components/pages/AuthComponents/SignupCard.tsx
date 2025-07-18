"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import InputField from "@/components/ui/custom/AuthInputField";
import { SignupFormData, signupSchema } from "@/lib/authSchema";
import GlassCard from "@/components/ui/custom/GlassCard";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

export default function SignupCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { signup } = useContext(AuthContext);
  const [serverError, setServerError] = useState<string>("");

  const onSubmit = async (data: SignupFormData) => {
    try {
      setServerError("");
      await signup(data);
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || "An error occurred during signup";

      // If it's an admin secret error, show it as a field error
      if (
        errorMessage.toLowerCase().includes("admin secret") ||
        errorMessage.toLowerCase().includes("invalid admin")
      ) {
        setError("adminSecret", {
          type: "server",
          message: errorMessage,
        });
      } else {
        setServerError(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard title="Create Account">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Username"
            type="text"
            id="username"
            register={register}
            error={errors.username?.message}
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            register={register}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            register={register}
            error={errors.password?.message}
          />
          <InputField
            label="Admin Secret"
            type="password"
            id="adminSecret"
            register={register}
            error={errors.adminSecret?.message}
          />

          {serverError && (
            <div className="text-red-400 text-sm text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              {serverError}
            </div>
          )}

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-40 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Signing up…" : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-white/60 text-sm mt-6">
            Already have an account?{" "}
            <Link
              href="/admin/login"
              className="text-white hover:text-white/80 underline transition-all"
            >
              Login here
            </Link>
          </p>
        </form>
      </GlassCard>
    </div>
  );
}
