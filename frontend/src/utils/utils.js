import React from 'react';

// Utility function
export function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// loading animation component
export const LoadingAnimation = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);
