"use client";

import React, { forwardRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

interface SearchFieldProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  isSearching?: boolean;
  placeholder?: string;
  resultsCount?: number;
  hasSearchQuery?: boolean;
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      searchQuery,
      onSearchChange,
      onClear,
      isSearching = false,
      placeholder = "Search articles...",
      resultsCount = 0,
      hasSearchQuery = false,
    },
    ref
  ) => {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="relative group">
          {/* Search Icon */}
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white h-5 w-5 transition-colors " />

          {/* Search Input */}
          <Input
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-14 h-10 bg-surface-alt/80 border-2 border-gray-600/50  focus:ring-1 focus:ring-accent/80 text-white placeholder:text-gray-400 rounded-fully transition-all duration-300  outline-none"
          />

          {/* Right side icons */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {isSearching && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 text-accent animate-spin" />
                <span className="text-sm text-accent font-medium">
                  Searching...
                </span>
              </div>
            )}

            {hasSearchQuery && !isSearching && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-6 w-6"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        {/* Search Results Info */}
        {hasSearchQuery && !isSearching && (
          <div className="mt-4 text-center animate-in fade-in slide-in-from-top-2 duration-500">
            {resultsCount === 0 ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-xs">
                  No articles found for "{searchQuery}"
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="h-2 w-2 bg-accent rounded-full"></div>
                <span className="text-accent text-xs">
                  {resultsCount} article{resultsCount !== 1 ? "s" : ""} found
                </span>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isSearching && hasSearchQuery && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-accent rounded-full animate-bounce"></div>
                <div
                  className="h-2 w-2 bg-accent rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="h-2 w-2 bg-accent rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-accent text-sm">Searching articles...</span>
            </div>
          </div>
        )}

        {/* Search Tips */}
        {!hasSearchQuery && (
          <div className="mt-3 text-center text-gray-500 text-sm">
            <span>Try searching for article titles, content, or keywords</span>
          </div>
        )}
      </div>
    );
  }
);

SearchField.displayName = "SearchField";

export default SearchField;
