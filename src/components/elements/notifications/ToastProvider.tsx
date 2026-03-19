import React, { createContext, useContext, useMemo, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export enum ToastType {
  Success = "success",
  Danger = "danger",
};

const ToastContext = createContext({
  showToast: (_message: string, _type: ToastType) => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<
    { message: string; type: ToastType } | undefined
  >(undefined);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ToastContainer position="top-center" className="p-3">
        {toast && (
          <Toast
            bg={toast.type}
            show
            autohide
            delay={5000}
            onClose={() => setToast(undefined)}
          >
            <Toast.Body className="text-white text-center">
              {toast.message}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);