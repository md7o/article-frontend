"use client";

import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { AlignLeft, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

export enum TitleAlignEnum {
  RIGHT_ALIGN = 'RIGHT_ALIGN',
  LEFT_ALIGN = 'LEFT_ALIGN',
}

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  titleAlign?: TitleAlignEnum;
  onTitleAlignChange?: (align: TitleAlignEnum) => void;
}

export default function TitleField({ 
  label, 
  value, 
  onChange, 
  titleAlign = TitleAlignEnum.LEFT_ALIGN,
  onTitleAlignChange 
}: InputProps) {
  const textAlign = titleAlign === TitleAlignEnum.RIGHT_ALIGN ? 'text-right' : 'text-left';

  return (
    <div className="group mb-4">
      {/* Alignment Controls */}
      {onTitleAlignChange && (
        <div className="flex justify-center mb-3">
          <div className="flex gap-1 p-1 bg-[var(--color-surface-elevated)] rounded-[var(--radius-sm)] border border-white/10">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onTitleAlignChange(TitleAlignEnum.LEFT_ALIGN)}
              className={`p-2 rounded transition-colors ${
                titleAlign === TitleAlignEnum.LEFT_ALIGN
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-[var(--color-light-span)] hover:text-white hover:bg-[var(--color-surface-alt)]'
              }`}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onTitleAlignChange(TitleAlignEnum.RIGHT_ALIGN)}
              className={`p-2 rounded transition-colors ${
                titleAlign === TitleAlignEnum.RIGHT_ALIGN
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-[var(--color-light-span)] hover:text-white hover:bg-[var(--color-surface-alt)]'
              }`}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Title Input */}
      <div className="flex justify-center items-center">
        <TextareaAutosize
          value={value}
          onChange={onChange}
          className={`w-full max-w-4xl text-4xl px-3 py-2 focus:outline-none focus:border-l-2 focus:border-white/30 placeholder-hover transition-all overflow-hidden resize-none ${textAlign}`}
          placeholder={label}
          minRows={1}
          cacheMeasurements
        />
      </div>
    </div>
  );
}
