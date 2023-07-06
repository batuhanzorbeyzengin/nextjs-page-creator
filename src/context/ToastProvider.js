'use client'

import React, { createContext } from 'react';

const { FC } = React;

const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
  const toastMessage = (msg) => {
    alert(msg);
  };

  return (
    <ToastContext.Provider value={toastMessage}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
