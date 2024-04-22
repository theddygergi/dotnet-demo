import React, { useState } from "react";
import axios from "axios";
import { mediaBaseUrl } from "../../constants/url.constant";
import Movies from "./movies/Movies";
import Books from "./books/Books";

function Invetory() {
  return (
    <div>
      <Movies />
      <br /> <br /> <br />
      <Books />
    </div>
  );
}

export default Invetory;
