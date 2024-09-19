import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, Settings, ChevronLeft, ChevronRight } from '@mui/icons-material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';  // Import the useTheme hook

const Logo = styled.div`
  padding: 16px;
  font-size: 24px;
  font-weight: bold;
`;

const SidebarWrapper = styled.div<{ rtl: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: ${(props) => (props.rtl ? '200px' : '240px')};
  background-color: ${(props) => props.theme.palette.background.default};  // Use the theme correctly
  transition: width 0.3s;
`;

const Sidebar: React.FC<{ rtl: boolean; collapsed: boolean; toggleCollapse: () => void; }> = ({ rtl, collapsed, toggleCollapse }) => {
  const theme = useTheme();  // Access the theme object

  return (
    <Drawer
      variant="permanent"
      anchor={rtl ? "right" : "left"}
      open={!collapsed}
    >
      <SidebarWrapper rtl={rtl} theme={theme}>  {/* Pass the theme explicitly */}
        <Logo>Logo</Logo>
        <IconButton onClick={toggleCollapse}>
          {collapsed ? rtl ? <ChevronLeft /> : <ChevronRight /> : rtl ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
        <List>
          <ListItem component={Link} to="/" disablePadding>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/settings" disablePadding>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </SidebarWrapper>
    </Drawer>
  );
};

export default Sidebar;
