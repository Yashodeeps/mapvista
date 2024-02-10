import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import GenerateMap from "./components/GenerateMap";
import ProjectMap from "./components/ProjectMap";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <Navbar />
      <BrowserRouter>
        <div className=" min-h-screen mt-16">
          <Routes>
            <Route path="/" element={<GenerateMap />} />
            <Route path="/signup" element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projectmap" element={<ProjectMap />} />

            {/* Define more routes here if needed */}
          </Routes>
          <Outlet />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
