import React from "react";
import Logo from "../images/Hash.png";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

function Navbar() {
  const handleLogout = async () => {
    localStorage.removeItem("CognitoUser");
    await Auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex py-6 px-12 items-center justify-between h-1/6">
      <span className="flex space-x-4 items-center">
        <img className="w-8" src={Logo} alt="HashNotify Logo" />
        <h1 className="text-lg">HashNotify</h1>
      </span>
      <span className="flex space-x-8">
        <Link to="/reminders" className="text-md underline decoration-blue-500 underline-offset-8">
          Reminders
        </Link>
        <Link onClick={handleLogout} className="text-md decoration-white text-gray-800">
          Logout
        </Link>
      </span>
    </div>
  );
}

export default Navbar;
