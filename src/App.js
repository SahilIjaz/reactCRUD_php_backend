import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListUser from "./componenets/ListUser";
import CreateUser from "./componenets/CreateUser";
import UpdateUser from "./componenets/UpdateUser";
function App() {
  return (
    <div className="App">
      <h1>React CRUD by using PHP amd MySQL DB.</h1>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">List Users</Link>
            </li>

            <li>
              <Link to="create/user">Create User</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<ListUser />} />
          <Route path="create/user" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
