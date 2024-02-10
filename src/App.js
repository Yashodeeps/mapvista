import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GenerateMap from "./components/GenerateMap";
import ProjectMap from "./components/ProjectMap";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider store={appStore}>
      <Navbar />
      <BrowserRouter>
        {" "}
        {/* Wrap your routes with BrowserRouter */}
        <div className=" min-h-screen mt-16">
          <Routes>
            <Route path="/" element={<GenerateMap />} />
            <Route path="/projectmap" element={<ProjectMap />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
