"use client";

import React from "react";
import TextareaAutosize from "react-textarea-autosize";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TitleField({ label, value, onChange }: InputProps) {
  return (
    <div className="group mb-4 flex justify-center items-center">
      <TextareaAutosize
        value={value}
        onChange={onChange}
        className="w-full max-w-4xl text-4xl px-3 py-2 focus:outline-none focus:border-l-2 focus:border-white/30 placeholder-hover transition-all overflow-hidden resize-none"
        placeholder={label}
        minRows={1}
        cacheMeasurements
      />
    </div>
  );
}
