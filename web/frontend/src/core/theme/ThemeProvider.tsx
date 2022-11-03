import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeContextType = {
  currentTheme?: string;
  changeTheme: (theme: string) => void;
};

export interface ThemeProviderProps {
  defaultTheme: string;
  storageName?: string;
  children?: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  defaultTheme,
  storageName = "CURRENT_THEME",
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>();

  const changeTheme = useCallback((themeName: string) => {
    document.body.setAttribute("theme", themeName);
    setCurrentTheme(themeName);
    localStorage.setItem(storageName, themeName);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const themes = import.meta.glob("/src/styles/themes/*.less", {
      eager: true,
    });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageName);
    if (savedTheme) {
      changeTheme(savedTheme);
    } else {
      changeTheme(defaultTheme);
    }
  }, [storageName, changeTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext<ThemeContextType | undefined>(ThemeContext);

  if (!context) {
    throw new Error("useTheme hook must be used in ThemeProvider");
  }

  return context;
}
