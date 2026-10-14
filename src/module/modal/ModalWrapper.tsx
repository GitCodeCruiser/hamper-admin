'use client';

import React, { useEffect } from 'react';

import CloseBtnIcon from '../../../icons/CloseBtnIcon';

interface ModalWrapperProps {
  open: boolean;
  onClose?: () => void;
  isAutoClose?: boolean;
  scroll?: 'paper' | 'body';
  title?: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  isAutoClose = true,
  scroll = 'paper',
  title,
  children,
}) => {
  // Prevent body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={isAutoClose ? onClose : undefined}
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90vh] w-full rounded-[16px] bg-white ${scroll === 'paper' ? 'overflow-y-auto' : ''} sm:max-w-lg md:max-w-xl lg:max-w-2xl`}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="text-base font-semibold">{title}</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-md p-1 hover:bg-gray-100"
                aria-label="Close modal"
              >
                <CloseBtnIcon />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
