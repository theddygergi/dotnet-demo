import React from "react";
import Movies from "./movies/Movies";
import Books from "./books/Books";
import "./Inventory.css";

function Inventory() {
  return (
    <div className="inventory-container">
      <div className="movies-container">
        <Movies />
      </div>
      <div className="books-container">
        <Books />
      </div>
    </div>
  );
}

export default Inventory;
