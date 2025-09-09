

import { cn } from "@/lib/utils";
import * as React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dots" | "lines" | "full";
  text?: string;
  width?: string;
}

export const Separator = ({
  variant = "lines",
  text,
  width,
  className,
  ...props
}: SeparatorProps) => {
  return (
    <div 
      className={cn(
        "flex items-center my-4",
        width ? "mx-auto" : "w-full",
        className
      )}
      style={{ width: width }}
      {...props}
    >
      {variant === "full" ? (
        <div className="w-full h-px bg-gray-300"></div>
      ) : (
        <>
          {variant === "dots" ? (
            <>
              <div className="flex-grow border-t-4  border-dotted border-gray-300"></div>
              {text && <span className="px-3 text-sm text-gray-500">{text}</span>}
              <div className="flex-grow border-t-4 border-dotted border-gray-300"></div>
            </>
          ) : (
            <>
              <div className="flex-grow h-px bg-gray-300"></div>
              {text && <span className="px-3 text-sm text-gray-500">{text}</span>}
              <div className="flex-grow h-px bg-gray-300"></div>
            </>
          )}
        </>
      )}
    </div>
  );
};