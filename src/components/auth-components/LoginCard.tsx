"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import InputField from "@/components/ui/custom/InputField";
import { SignupFormData, signupSchema } from "@/lib/schemas/authSchema";
import GlassCard from "@/components/ui/custom/GlassCard";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function LoginCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { login } = useContext(AuthContext);


  const onSubmit = async (data: SignupFormData) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <GlassCard title="Welcome Back">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              className="w-[10rem] bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-full transition-all duration-300 cursor-pointer"
            >
              {isSubmitting ? "Logining..." : "Login"}
            </button>
          </div>

          <p className="text-center text-white/60 text-sm mt-6">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-white hover:text-white/80 underline transition-all"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </GlassCard>
    </div>
  );
}
