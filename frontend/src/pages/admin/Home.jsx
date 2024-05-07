import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import "./Home.css";

function Home() {
  return (
    <div>
      <h1 style={{marginLeft:"550px",fontSize:"bold"}}>LibraFlick</h1><br/>
      <h3 style={{marginLeft:"550px"}}>Your Ultimate Library Book and Movie Management System</h3><br/>
      <p  style={{width:"350px",marginLeft:"550px"}}>
        Welcome to LibraFlick, your one-stop solution for organizing and
        managing your library of books and movies with ease and efficiency.
        Whether you're a voracious reader, a film enthusiast, or both,
        LibraFlick offers a seamless platform to catalog, track, and explore
        your favorite titles.
        LibraFlick transforms the way you manage and engage with your library of
        books and movies, offering unparalleled convenience, exploration, and
        enjoyment. Join our community today and embark on a journey of literary
        and cinematic discovery like never before.
      </p>
    </div>
  );
}

export default Home;
