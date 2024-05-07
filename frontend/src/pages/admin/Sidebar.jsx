import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

import "./Sidebar.css";
import { Link } from "react-router-dom";
function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> LIBRAFLICK
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}></span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/adminPage">
            <BsGrid1X2Fill className="icon" /> Home
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/addmovies">
            <BsFillArchiveFill className="icon" /> Add Movie
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="/addbooks">
            <BsFillGrid3X3GapFill className="icon" /> Add Book
          </a>
        </li>
        <li className="sidebar-list-item">
          <Link to="/manageusers">
            <BsPeopleFill className="icon" /> Manage Users
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/inventory">
            <BsListCheck className="icon" /> Inventory
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/reports">
            <BsMenuButtonWideFill className="icon" /> Reports
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/registerAdmin">
            <BsFillGearFill className="icon" /> Add Admin
            </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
