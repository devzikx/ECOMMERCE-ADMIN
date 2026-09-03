'use client';

import { useEffect } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? Check : AlertCircle;

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColor} ${borderColor} shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-200`}
    >
      <Icon size={20} className={type === 'success' ? 'text-green-600' : 'text-red-600'} />
      <p className={`text-sm font-medium ${textColor}`}>{message}</p>
    </div>
  );
}
