import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsJustify,
  BsSearch,
} from "react-icons/bs";
import "./Header.css";

function Header({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon-header" />
        <BsFillEnvelopeFill className="icon-header" />
        <BsPersonCircle className="icon-header" />
      </div>
    </header>
  );
}

export default Header;
