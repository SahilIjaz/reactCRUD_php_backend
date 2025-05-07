import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ListUser() {
  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get("http://localhost/ReactCRUD/index.php")
      .then((response) => {
        console.log("Server Response:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user, key) => (
              <tr key={key}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile_no}</td>
                <td>
                  <Link
                    to={`user/${user.id}/update`}
                    style={{ marginRight: "13px" }}
                  >
                    Edit
                  </Link>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          {/* {users.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile_no}</td>
              <td>
                <Link to={`user/${user.id}/update`}>Edit</Link>
                <button>Delete</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
