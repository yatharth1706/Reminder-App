import React from "react";
import LeftSideBar from "./LeftSideBar";
import Main from "./Main";

function Reminder() {
  return (
    <div className="px-12 mt-6 flex space-x-4 h-100 max-h-128 ">
      {/* Left Nav */}
      <LeftSideBar />
      {/* Main Grid */}
      <Main />
    </div>
  );
}

export default Reminder;
