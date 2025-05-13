import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });

  const [showPrompt, setShowPrompt] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Sending Data:", inputs);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/create-user",
        inputs
      );
      console.log("Server Response:", response.data);
      setShowPrompt(true);

      // Hide prompt and navigate after 2 seconds
      setTimeout(() => {
        setShowPrompt(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="create-user relative flex items-center justify-center min-h-screen">
      {/* Success Prompt */}
      {showPrompt && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 animate-slide-down z-50">
          🎉 Congratulations! Your account has been created.
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-user-form">
        <h1 className="text-2xl font-bold mb-4">Sign-Up</h1>
        <table cellSpacing={"10"}>
          <tbody>
            <tr>
              <th>
                <label>Name:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                  className="border px-2 py-1 rounded"
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>Email:</label>
              </th>
              <td>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                  className="border px-2 py-1 rounded"
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>Password:</label>
              </th>
              <td>
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded"
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>Gender:</label>
              </th>
              <td>
                <select
                  name="gender"
                  value={inputs.gender}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>
                <label>Role:</label>
              </th>
              <td>
                <select
                  name="role"
                  value={inputs.role}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Select Role</option>
                  <option value="recruiter">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="right">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
