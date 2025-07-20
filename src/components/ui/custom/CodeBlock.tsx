"use client";

import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import { Copy, Check } from "lucide-react";

// Import common languages for better detection
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";
import swift from "highlight.js/lib/languages/swift";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import go from "highlight.js/lib/languages/go";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import markdown from "highlight.js/lib/languages/markdown";
import bash from "highlight.js/lib/languages/bash";
import sql from "highlight.js/lib/languages/sql";

// Register all languages
const languages = {
  javascript,
  typescript,
  python,
  cpp,
  css,
  html: xml,
  java,
  swift,
  ruby,
  rust,
  go,
  json,
  yaml,
  markdown,
  bash,
  sql,
};

// Register languages with highlight.js
Object.entries(languages).forEach(([name, language]) => {
  hljs.registerLanguage(name, language);
});

interface CodeBlockProps {
  code: string;
  language: string;
  languageLabel: string;
}

export default function CodeBlock({
  code,
  language,
  languageLabel,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>("");

  useEffect(() => {
    if (codeRef.current) {
      if (!language) {
        // Auto-detect language if none specified
        const result = hljs.highlightAuto(code);
        codeRef.current.innerHTML = result.value;
        if (result.language) {
          const lang = result.language;
          const formattedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
          setDetectedLanguage(`Auto: ${formattedLang}`);
        }
      } else {
        hljs.highlightElement(codeRef.current);
      }
    }
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10 flex gap-2 items-center">
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center p-2 text-gray-200 bg-codeBlock
                   backdrop-blur-sm rounded-md border border-gray-700/50 transition-all
                   hover:bg-button focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
          title="Copy to clipboard"
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <div
          className="text-xs text-gray-200 bg-codeBlock/80 backdrop-blur-sm px-3 py-1.5 
                   rounded-md font-medium shadow-sm border border-gray-700/50 transition-opacity"
        >
          {language ? languageLabel : detectedLanguage || "Plain Text"}
        </div>
      </div>
      <pre className="bg-code-bg font-mono p-4 pt-12 rounded-sm shadow-lg overflow-x-auto">
        <code
          ref={codeRef}
          className={language ? `language-${language} hljs` : "hljs"}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
