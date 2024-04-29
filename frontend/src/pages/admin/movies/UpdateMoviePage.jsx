import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./AdminPage.css";
import { useState } from "react";
import UpdateMovie from "./UpdateMovie";

function UpdateMoviePage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Header />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <UpdateMovie />
    </div>
  );
}

export default UpdateMoviePage;
