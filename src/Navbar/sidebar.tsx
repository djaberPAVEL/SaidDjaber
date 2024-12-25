import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import {
  FaChartPie,
  FaCalendar,
  FaShoppingCart,
  FaBars,
  FaSun,
  FaMoon,
  FaHome,
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaPiggyBank,
  FaCertificate,
  FaExchangeAlt,
  FaDoorOpen,
  FaFileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MainPage from "../MainPage/MainPage";

const darkTheme = {
  sidebar: {
    backgroundColor: "#2d2d44", // Slightly lighter navy
    color: "#dcdcdc", // Soft white text
  },
  menu: {
    backgroundColor: "#2d2d44", // Slightly lighter navy
    color: "#dcdcdc", // Soft white text
    hoverBackgroundColor: "#3b3b58", // Hover: deeper navy
    hoverColor: "#ffffff", // Hover: bright white
  },
  logo: {
    backgroundColor: "#2d2d44", // Slightly lighter navy
    color: "#dcdcdc", // Soft white text
  },
};

const lightTheme = {
  sidebar: {
    backgroundColor: "#ffffff", // Pure white
    color: "#2d2d2d", // Dark gray text
  },
  menu: {
    backgroundColor: "#f4f4f4", // Light gray background
    color: "#333333", // Darker gray text
    hoverBackgroundColor: "#dddddd", // Hover: medium gray
    hoverColor: "#000000", // Hover: pure black
  },
  logo: {
    backgroundColor: "#ffffff", // Pure white
    color: "#2d2d2d", // Dark gray text
  },
};

const Logo = styled.div<{ theme: any }>`
  padding: 10px;
  text-align: center;

  img {
    width: 80%;
    margin-bottom: 10px;
  }
`;
// const StyledSidebar = styled(Sidebar)<{ theme: any }>`
// direction: rtl;
// position: fixed;
// right: 0;
// height: 100vh;
// background-color: ${(props) => props.theme.sidebar.backgroundColor};
// color: ${(props) => props.theme.sidebar.color};
// `;

// const StyledMenuItem = styled(MenuItem)<{ theme: any }>`
// background-color: ${(props) => props.theme.menu.backgroundColor};
// color: ${(props) => props.theme.menu.color};
// &:hover {
//   background-color: ${(props) => props.theme.menu.hoverBackgroundColor};
//   color: ${(props) => props.theme.menu.hoverColor};
// }
// `;

// const StyledMenu = styled(Menu)<{ theme: any }>`
// background-color: ${(props) => props.theme.menu.backgroundColor};
// color: ${(props) => props.theme.menu.color};
// `;

const MySidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <Sidebar
      rtl
      collapsed={collapsed}
      //image={"src/Navbar/solution-sidebar-background1.jpg"}

      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "#4F9153", // Slightly lighter navy
          color: "#dcdcdc", // Soft white text

          //height: "100vh",
          flexBasis: "200px",
        },
      }}
    >

      
      <Logo>
        
        <img src="src/assets/logo2.jpg" alt="Logo" />
      </Logo>
      <Menu
        menuItemStyles={{
          button: () => {
            return {
              "&:hover": {
                backgroundColor: "#3E8E41", // Darker green on hover
                color: "#ffffff", // White text on hover
                fontWeight: "bold",
              },
            };
          },
        }}
      >
        <MenuItem icon={<FaBars />} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "تكبير" : "تصغير"}
        </MenuItem>
        {/* <MenuItem
          icon={isDarkTheme ? <FaSun /> : <FaMoon />}
          onClick={toggleTheme}
        >
          {isDarkTheme ? "Light Mode" : "Dark Mode"}
        </MenuItem> */}
        {/* <SubMenu label="Charts" icon={<FaChartPie />}>
          <MenuItem
            rootStyles={{
              backgroundColor: "#4F9153", // Slightly lighter navy
              // color: "#dcdcdc", // Soft white text
            }}
          >
            {" "}
            Pie charts{" "}
          </MenuItem>
          <MenuItem
            rootStyles={{
              backgroundColor: "#4F9153", // Slightly lighter navy
              // color: "#dcdcdc", // Soft white text
            }}
          >
            {" "}
            Line charts{" "}
          </MenuItem>
        </SubMenu> */}
        <MenuItem icon={<FaHome  />} component={<Link to="/" />}>
          الرئيسية
        </MenuItem>
        <MenuItem icon={<FaUser  />} component={<Link to="/employees" />}>
          الموظف
        </MenuItem>
        {/* <MenuItem icon={<FaUser  />} component={<Link to="/pos" />}>
          نقطة البيع
        </MenuItem> */}
        <MenuItem icon={<FaBriefcase  />} component={<Link to="/jobs" />}>
          المنصب
        </MenuItem>
        <MenuItem icon={<FaBuilding  />} component={<Link to="/employees" />}>
          المصلحة
        </MenuItem>
        <MenuItem icon={<FaPiggyBank  />} component={<Link to="/employees" />}>
          التقاعد
        </MenuItem>
        <MenuItem icon={<FaCertificate  />} component={<Link to="/employees" />}>
          شهادة عمل
        </MenuItem>
        <MenuItem icon={<FaSun  />} component={<Link to="/employees" />}>
          عطلة
        </MenuItem>
        <MenuItem icon={<FaExchangeAlt  />} component={<Link to="/employees" />}>
          التحويل
        </MenuItem>
        <MenuItem icon={<FaDoorOpen  />} component={<Link to="/employees" />}>
          الاستقالة
        </MenuItem>
        <MenuItem icon={<FaFileAlt   />} component={<Link to="/employees" />}>
          الإحالة على الاستيداع
        </MenuItem>
        <MenuItem icon={<FaFileAlt  />} component={<Link to="/employees" />}>
          الإحالة على الانتداب
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MySidebar;
