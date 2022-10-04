import React from "react";
import LeftSideBar from "./LeftSideBar";
import Main from "./Main";

function Reminder() {
  return (
    <div className="px-24 mt-6 flex space-x-4">
      {/* Left Nav */}
      <LeftSideBar />
      {/* Main Grid */}
      <Main />
    </div>
  );
}

export default Reminder;
