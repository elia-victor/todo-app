import React from "react";

type DescriptionSize = "sm" | "md" | "lg";

interface DescriptionTextProps {
  text: string;
  size?: DescriptionSize;
  className?: string;
}

const sizeClasses: Record<DescriptionSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const DescriptionText: React.FC<DescriptionTextProps> = ({
  text,
  size = "md",
  className = "",
}) => {
  return (
    <p className={`${sizeClasses[size]} text-gray-600 ${className}`}>
      {text}
    </p>
  );
};

export default DescriptionText;
