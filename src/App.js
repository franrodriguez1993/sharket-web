import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/accesories/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="outline">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
