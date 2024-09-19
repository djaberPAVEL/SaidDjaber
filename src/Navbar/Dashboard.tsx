import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Switch } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Sidebar from './sidebar_copy';
import ThemeToggle from './ThemeToggle';

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleRtl = () => setIsRtl(!isRtl);
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <Sidebar rtl={isRtl} collapsed={collapsed} toggleCollapse={toggleCollapse} />
          <div style={{ flex: 1, padding: '16px' }}>
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <Switch  onChange={toggleRtl} />
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default Dashboard;
