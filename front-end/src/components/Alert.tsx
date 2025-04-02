import React, {useEffect, useState } from "react";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?:number;
}

const Alert: React.FC<AlertProps> = ({ message, type = "info" ,duration = 3000}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const typeStyles = {
    success: "bg-white text-green-700 border-l-4 border-green-500",
    error: "bg-white text-red-700 border-l-4 border-red-500",
    warning: "bg-white text-yellow-700 border-l-4 border-yellow-500",
    info: "bg-white text-blue-700 border-l-4 border-blue-500",
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center px-4 py-2 border-l-4 rounded-md shadow-lg animate-slide-in ${typeStyles[type]}`} role="alert">
      <span className="flex-1">{message}</span>
      <button className="ml-4 text-white opacity-70 hover:opacity-100" onClick={() => setVisible(false)}>
        ✖
      </button>
    </div>
  );
};

export default Alert;

/*
<Alert message="Success! Operation completed." type="success" />
<Alert message="Error! Something went wrong." type="error" />
<Alert message="Warning! Check your inputs." type="warning" />
<Alert message="Info! This is an alert message." type="info" />
*/ 