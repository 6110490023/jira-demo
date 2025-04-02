import React, { createContext, useContext, useState, ReactNode } from "react";
import Alert from "../components/Alert"; // Ensure you have an Alert component

type AlertType = "success" | "error" | "warning" | "info";

interface AlertContextProps {
  showAlert: (message: string, type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null);

  const showAlert = (message: string, type: AlertType = "info") => {
    setAlert({ message, type });

    // Auto-dismiss alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert && <Alert message={alert.message} type={alert.type} />}
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook for using alert context
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
