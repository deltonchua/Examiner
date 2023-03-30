'use client';

import { useEffect } from 'react';
import { type Toast, useToast } from './ToastContext';

const TIMEOUT = 4_000;

function ToastComponent({ toast }: { toast: Toast }) {
  const { message, timestamp, type } = toast;
  const { removeToast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      removeToast(timestamp);
    }, TIMEOUT);
  }, [removeToast, timestamp]);

  return (
    <div className='fixed left-0 right-0 bottom-4 container flex items-center justify-center toast'>
      <div
        className={`shadow rounded-full p-4 flex items-center gap-2 font-semibold ${
          type === 'error'
            ? 'bg-rose-50 text-rose-700'
            : 'bg-teal-50 text-teal-700'
        }`}
      >
        <span className='line-clamp-2 text-sm'>{message}</span>
        <button
          title='Close'
          onClick={() => {
            removeToast(timestamp);
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5'
          >
            <path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToast();
  const type: any = 'error';
  return (
    <div>
      {toasts.map((t, i) => (
        <ToastComponent toast={t} key={i} />
      ))}
    </div>
  );
}
