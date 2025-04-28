"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import InputField from "@/components/ui/custom/InputField";
import { SignupFormData, signupSchema } from "@/lib/authSchema";
import GlassCard from "@/components/ui/custom/GlassCard";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function SignupCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { signup } = useContext(AuthContext);

  const onSubmit = async (data: SignupFormData) => {
    await signup(data);
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
              href="/login"
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
