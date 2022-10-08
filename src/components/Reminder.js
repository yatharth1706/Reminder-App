import React from "react";
import LeftSideBar from "./LeftSideBar";
import Main from "./Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reminder() {
  return (
    <div className="px-12 mt-6 flex space-x-4 h-100 max-h-128 ">
      {/* Left Nav */}
      <LeftSideBar />
      {/* Main Grid */}
      <Main />
      <ToastContainer />
    </div>
  );
}

export default Reminder;
