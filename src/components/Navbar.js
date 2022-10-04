import React from "react";
import Logo from "../images/Hash.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex py-6 px-24 items-center justify-between h-1/6">
      <span className="flex space-x-4 items-center">
        <img className="w-8" src={Logo} alt="HashNotify Logo" />
        <h1 className="text-lg">HashNotify</h1>
      </span>
      <span className="flex space-x-8">
        <Link to="/reminders" className="text-md underline decoration-blue-500 underline-offset-8">
          Reminders
        </Link>
        <Link to="/logout" className="text-md">
          Logout
        </Link>
      </span>
    </div>
  );
}

export default Navbar;
