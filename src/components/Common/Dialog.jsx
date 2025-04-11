import React from "react";

export function Dialog({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {children}
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold mb-4">{children}</h2>
);

export const DialogContent = ({ children }) => (
  <div className="mb-4">{children}</div>
);
