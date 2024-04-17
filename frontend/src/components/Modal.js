import React, { useCallback, useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
console.log("Modal isOpen:", isOpen);

  const modalContentRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-80 z-50 flex justify-center items-center px-4 py-6">
      <div ref={modalContentRef} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto max-h-[90vh] overflow-auto text-black dark:text-white">
        <button onClick={onClose} className="float-right font-bold text-black dark:text-white">X</button>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

