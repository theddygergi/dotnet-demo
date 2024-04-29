import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./AdminPage.css";
import { useState } from "react";
import UpdateBook from "./UpdateBook";

function UpdateBookPage() {
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
      <UpdateBook />
    </div>
  );
}

export default UpdateBookPage;
