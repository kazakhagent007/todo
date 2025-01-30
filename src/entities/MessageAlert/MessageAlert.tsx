'use client';

import { useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MessageTypes } from '@/entities/types/MessageTypes';
import clsx from 'clsx';

interface MessageProps {
  title: string;
  type: MessageTypes;
  open: boolean;
  onClose: () => void;
}

const messageStyles = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-yellow-600',
  info: 'bg-blue-600',
};

export function MessageAlert({ open, title, type, onClose }: MessageProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Transition
      show={true}
      as={Fragment}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog open={true} onClose={onClose} className="fixed bottom-4 right-4 z-50">
        <Transition.Child
          as={Fragment}
          enter="transform transition duration-300"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transform transition duration-300"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-4 opacity-0"
        >
          <div className={clsx('text-white p-4 rounded-lg shadow-lg max-w-xs', messageStyles[type] || 'bg-gray-800')}>
            <strong>{title}</strong>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
