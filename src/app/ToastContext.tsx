'use client';

import { createContext, useContext, useState } from 'react';

export interface Toast {
  timestamp: number;
  type: 'info' | 'error';
  message: string;
}

const ToastContext = createContext<{
  toasts: Toast[];
  toast: (message: string, type?: Toast['type']) => void;
  removeToast: (timestamp: number) => void;
}>({ toasts: [], toast: () => {}, removeToast: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: Toast['type'] = 'info') => {
    setToasts((prev) => [...prev, { timestamp: Date.now(), type, message }]);
  };

  const removeToast = (timestamp: number) => {
    setToasts((prev) => prev.filter((p) => p.timestamp !== timestamp));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
