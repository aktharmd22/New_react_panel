import React, { createContext, useState } from 'react';

// Create a context
export const TextContext = createContext();

// Create a provider component
export const TextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <TextContext.Provider value={{ data, setData }}>
      {children}
    </TextContext.Provider>
  );
};
