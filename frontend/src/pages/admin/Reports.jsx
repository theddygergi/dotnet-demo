import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  adminBaseUrl,
  mediaBaseUrl,
  usersBaseUrl,
} from "../../constants/url.constant";
import axios from "axios";

function Reports() {
  const [count, setCount] = useState(0);
  const [countB, setCountB] = useState(0);
  const [countM, setCountM] = useState(0);
  const [countA, setCountA] = useState(0);

  const getUserCount = async () => {
    try {
      const res = await axios.get(usersBaseUrl + "GetNbUsers");
      setCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBookCount = async () => {
    try {
      const res = await axios.get(mediaBaseUrl + "GetNbBooks");
      setCountB(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMediaCount = async () => {
    try {
      const res = await axios.get(mediaBaseUrl + "GetNbMovies");
      setCountM(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAdminCount = async () => {
    try {
      const res = await axios.get(adminBaseUrl + "AdminCount");
      setCountM(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCount();
    getBookCount();
    getMediaCount();
    getAdminCount();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>MOVIES</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{countM}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>BOOKS</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{countB}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>USERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{count}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ADMINS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>{countA}</h1>
        </div>
      </div>
    </main>
  );
}

export default Reports;
