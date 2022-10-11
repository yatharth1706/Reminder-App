import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reminder from "./components/Reminder";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Confirm from "./components/Confirm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";

function App() {
  return (
    <Router>
      <div className="font-nunito h-full max-w-7xl mx-auto">
        {/* Navbar */}
        {/* Routes */}
        <Routes>
          <Route element={<WithNav />}>
            <Route path="/reminders" element={<Reminder />} />
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/confirm" element={<Confirm />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
