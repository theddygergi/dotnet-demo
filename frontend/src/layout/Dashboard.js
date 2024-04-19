// Dashboard.js
import React, { useState } from "react";
import Sidebar from "./SideBar";
import { Menu } from "@mui/icons-material";
import { Button } from "@mui/material";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Button style={{color: '#fcb8d2'}} onClick={toggleSidebar}><Menu/></Button>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="main-content">
        {/* Your dashboard sections/components go here */}
      </div>
    </div>
  );
};

export default Dashboard;
