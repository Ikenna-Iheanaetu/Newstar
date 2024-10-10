import React, { createContext, useContext, useEffect, useState } from "react";
import { getIsDarkModeTrue, setIsDarkModeTrue } from "@/utils/darkModeStorage";
import { ColorObj } from "@/types/colorsTypes";
import { Color } from "@/constants/Colors";

interface DarkModeContextType {
  enabled: boolean;
  toggleDarkMode: () => void;
  Colors: ColorObj
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const Colors = Color[enabled ? 1 : 0]

  useEffect(() => {
    const fetchDarkModeSetting = async () => {
      const darkModeEnabled = await getIsDarkModeTrue();
      setEnabled(darkModeEnabled);
    };

    fetchDarkModeSetting();
  }, []);

  useEffect(() => {
    const updateDarkModeSetting = async () => {
      await setIsDarkModeTrue(enabled);
    };

    updateDarkModeSetting();
  }, [enabled]);

  const toggleDarkMode = () => {
    setEnabled((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ enabled, toggleDarkMode, Colors }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use the DarkModeContext
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
