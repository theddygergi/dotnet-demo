import React, { useEffect, useState } from "react";
import axios from "axios";
import { usersBaseUrl } from "../../constants/url.constant";
import "./ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(usersBaseUrl + "GetAllUsers");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(usersBaseUrl + "DeleteUser/" + id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users.length === 0 ? (
        <h1>No users </h1>
      ) : (
        <table className="table-wrapper">
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.passwordHash}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageUsers;
