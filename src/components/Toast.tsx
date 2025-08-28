import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

const Toast: React.FC<ToastProps> = ({ message, type = "info" }) => {
  const bgColor =
    type === "error"
      ? "bg-red-500"
      : type === "success"
      ? "bg-green-500"
      : "bg-gray-500";

  return (
    <div className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-md text-white ${bgColor} shadow-lg`}>
      {message}
    </div>
  );
};

export default Toast;
