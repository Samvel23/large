"use client";
import { createContext, useContext, useState } from "react";

// Create the Context
const LanguageContext = createContext();

// Provider Component
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("eng");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for easier access
export const useLanguage = () => useContext(LanguageContext);
