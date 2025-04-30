"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  validationType?: "email" | "mobile" | "password" | "text";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, validationType, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute end-2 top-1/2 -translate-y-1/2 text-softColor text-xl text-black bg-white w-13 h-13 rounded-fully flex justify-center items-center hover:scale-95 hover:opacity-80 cursor-pointer duration-300">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-16 w-[25rem] rounded-fully bg-secondary text-white px-5 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium file:text-zinc-950 placeholder:text-softColor disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400",

            className
          )}
          ref={ref}
          // onChange={handleValidation}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
