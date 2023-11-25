import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios, AxiosInstance, AxiosStatic } from "axios";

type Theme = "light" | "dark" | "system";

type ThemeContextData = {
  theme: Theme | undefined | null;
  changeTheme: (theme: Theme) => Promise<void>;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const themeStorageKey = "@Theme:theme";

export const ThemeContext = createContext({} as ThemeContextData);

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    async function loadTheme() {
      const themeStorage = await AsyncStorage.getItem(themeStorageKey);

      if (themeStorage) {
        setTheme(themeStorage as Theme);
      }
    }

    loadTheme();
  }, []);

  // create a function that handles the change theme event

  async function changeTheme(theme: Theme) {
    setTheme(theme);

    await AsyncStorage.setItem("@Theme:theme", theme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  return context;
}

export { ThemeProvider, useTheme };
