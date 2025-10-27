import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-2xl font-medium transition shadow hover:opacity-90";
  const styles =
    variant === "outline"
      ? "border border-gray-400 text-gray-700 bg-white"
      : "bg-blue-600 text-white";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

