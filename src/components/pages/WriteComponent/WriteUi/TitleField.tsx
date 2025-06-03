"use client";

import React, { useEffect } from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export default function TitleField({
  label,
  value,
  onChange,
  textareaRef,
}: InputProps) {
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="group mb-4 flex justify-center items-center">
      <p className="px-5 text-white/50 opacity-0 group-focus-within:opacity-100 transition-opacity">
        {label}
      </p>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className="w-[45rem] text-4xl px-3 py-2 focus:outline-none focus:border-l-2 focus:border-white/30 placeholder-hover transition-all resize-none overflow-hidden"
        placeholder={label}
        rows={1}
      />
    </div>
  );
}
