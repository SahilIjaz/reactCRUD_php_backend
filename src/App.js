import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateUser from "./componenets/CreateUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            {/* <li>
              <Link to="/">List Users</Link>
            </li> */}

            {/* <li>
              <Link to="">Create User</Link>
            </li> */}
          </ul>
        </nav>

        <Routes>
          {/* <Route index element={<ListUser />} /> */}
          <Route path="" element={<CreateUser />} />
          {/* <Route path="" element={<UpdateUser />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
