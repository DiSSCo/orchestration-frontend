import React, { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export enum ToastType {
  Success = "success",
  Danger = "danger",
};

const ToastContext = createContext({
  showToast: (_message: string, _type: ToastType) => { },
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<
    { message: string; type: ToastType } | undefined
  >(undefined);

  return (
    <ToastContext.Provider
      value={{
        showToast: (message, type) => setToast({ message, type }),
      }}
    >
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