import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/accesories/Navbar";
import Footer from "./components/accesories/Footer";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="outline">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
