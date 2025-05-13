import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateUser from "./componenets/CreateUser";
import AllJobs from "./componenets/AllJobs";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            {/* <li>
              <Link to="/all-jobs">List Users</Link>
            </li> */}

            {/* <li>
              <Link to="">Create User</Link>
            </li> */}
          </ul>
        </nav>

        <Routes>
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
