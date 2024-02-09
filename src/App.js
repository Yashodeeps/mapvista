import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GenerateMap from "./components/GenerateMap";
import ProjectMap from "./components/ProjectMap";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        {" "}
        {/* Wrap your routes with BrowserRouter */}
        <div className="flex items-center justify-center min-h-screen">
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
