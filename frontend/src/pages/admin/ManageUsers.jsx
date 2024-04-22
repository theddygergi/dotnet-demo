import React, { useState } from "react";
import axios from "axios";
import { usersBaseUrl } from "../../constants/url.constant";

function ManageUsers() {
  const [users, setUsers] = useState({});
  const getUsers = async () => {
    try {
        const res = await axios.get(usersBaseUrl+"GetAllUsers")
        setUsers(res.data);
    } catch (error) {
        console.log(error);
    }
  }
  return <div></div>
}

export default ManageUsers;
