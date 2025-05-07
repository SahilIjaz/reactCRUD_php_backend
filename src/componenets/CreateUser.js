import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CreateUser() {
  const [inputs, setInputs] = useState({});
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
      .post("http://localhost/ReactCRUD/index.php", inputs)
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
      <h1>Create USer</h1>
      <form onSubmit={handleSubmit}>
        <table cellSpacing={"10"}>
          <tbody>
            <tr>
              <th>
                <label>Name:</label>
              </th>
              <td>
                <input type="text" name="name" onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <th>
                <label>Email:</label>
              </th>
              <td>
                <input type="text" name="email" onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <th>
                <label>Mobile:</label>
              </th>
              <td>
                <input type="text" name="mobile_no" onChange={handleChange} />
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
