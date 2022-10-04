import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="font-nunito">
        {/* Navbar */}
        <Navbar />
        {/* Routes */}
      </div>
    </Router>
  );
}

export default App;
