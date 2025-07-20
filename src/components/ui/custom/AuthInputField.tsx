// components/ui/custom/InputField.tsx
import React from "react";

interface InputProps {
  label: string;
  type: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: string;
}

export default function AuthInputField({
  label,
  type,
  id,
  register,
  error,
}: InputProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-white/80 mb-2 ml-2 text-lg font-medium"
      >
        {label}
      </label>
      <input
        {...register(id)}
        type={type}
        id={id}
        className={`w-full px-4 py-2 bg-white/10 rounded-full ${
          error ? "border border-red-300 " : "border-white/50"
        } focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/30 transition-all`}
        placeholder={label}
      />
      {error && <p className="mt-1 ml-2 text-red-300 text-lg">{error}</p>}
    </div>
  );
}
