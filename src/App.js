import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reminder from "./components/Reminder";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="font-nunito h-full">
        {/* Navbar */}
        <Navbar />
        {/* Routes */}
        <Routes>
          <Route path="/reminders" element={<Reminder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
