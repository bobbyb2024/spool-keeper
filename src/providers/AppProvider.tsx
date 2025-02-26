'use client';

import { createContext, useContext, ReactNode, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme as baseTheme } from '@/theme';

interface AppContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider component that provides theme and global context
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider wrapped application
 */
export function AppProvider({ children }: AppProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const theme = useMemo(() => createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#1A1C1E' : baseTheme.palette.background.default,
        paper: isDarkMode ? '#2A2D2F' : baseTheme.palette.background.paper,
      },
    },
  }), [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

/**
 * Hook to access app context
 * @returns {AppContextType} App context value
 */
export const useApp = () => useContext(AppContext); 