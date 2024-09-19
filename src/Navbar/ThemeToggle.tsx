import React from 'react';
import { Switch } from '@mui/material';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      color="default"
    />
  );
};

export default ThemeToggle;
