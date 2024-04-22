import React from "react";
import Sidebar from "../Sidebar";
import Home from "../Home";
import Header from "../Header";
import "./AdminPage.css";
import { useState } from "react";
import AddMovies from "./AddMovies";

function AddMoviesPage() {
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
      <AddMovies />
    </div>
  );
}

export default AddMoviesPage;
