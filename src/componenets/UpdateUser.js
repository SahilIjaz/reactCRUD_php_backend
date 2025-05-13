import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      // .get(`http://localhost/ReactCRUD/index.php/${id}`)
      .then((response) => {
        console.log("Server Response:", response.data);
        setInputs(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Data being sent:", inputs);

    axios
      .patch(`http://localhost/ReactCRUD/index.php/${id}/update`, inputs)
      .then((response) => {
        console.log("Server Response:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log(inputs);
  };

  return (
    <div className="create-user">
      <h1>Update USer</h1>
      <form onSubmit={handleSubmit}>
        <table cellSpacing={"10"}>
          <tbody>
            <tr>
              <th>
                <label>Name:</label>
              </th>
              <td>
                <input
                  value={inputs.name}
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>Email:</label>
              </th>
              <td>
                <input
                  value={inputs.email}
                  type="text"
                  name="email"
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>Mobile:</label>
              </th>
              <td>
                <input
                  value={inputs.mobile_no}
                  type="text"
                  name="mobile_no"
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={"2"} align="right">
                <button>Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
