import React from "react";

type TitleSize = "sm" | "md" | "lg" | "xl";

interface TitleTextProps {
  text: string;
  size?: TitleSize;
  className?: string;
}

const sizeClasses: Record<TitleSize, string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const TitleText: React.FC<TitleTextProps> = ({
  text,
  size = "md",
  className = "",
}) => {
  return (
    <h1 className={`${sizeClasses[size]} font-bold text-gray-800 ${className}`}>
      {text}
    </h1>
  );
};

export default TitleText;
