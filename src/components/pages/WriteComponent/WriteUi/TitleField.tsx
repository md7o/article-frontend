"use client";

import React, { useEffect, useRef, useState } from "react";

interface InputProps {
  label: string;
  type: string;
}

export default function TitleField({ label }: InputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to get the correct scrollHeight
      textareaRef.current.style.height = "auto";
      // Set new height based on content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="group mb-4 flex justify-center items-center">
      {/* <label className="block text-white/80 text-lg font-medium">{label}</label> */}

      <p className="px-5 text-white/50 opacity-0 group-focus-within:opacity-100 transition-opacity">
        Title
      </p>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-[45rem] text-4xl px-3 py-2 focus:outline-none focus:border-l-2 focus:border-white/30 placeholder-hover transition-all resize-none overflow-hidden`}
        placeholder={label}
        rows={1} // Start with one row
      />
    </div>
  );
}
