import React from "react";
import All from "../images/icons/All.svg";
import Pending from "../images/icons/Pending.svg";
import Completed from "../images/icons/Done.svg";
import Calender from "../images/icons/Calender.svg";

function LeftSideBar() {
  return (
    <div className="bg-white drop-shadow-2xl rounded-md w-1/6 h-96 flex flex-col space-y-3 px-3 py-6">
      <span className="flex space-x-2 items-center bg-blue-600 rounded-sm px-4 py-2 text-white">
        <img src={All} className="w-4" />
        <span>All</span>
      </span>
      <span className="flex space-x-2 items-center px-4 py-2">
        <img src={Pending} className="w-4" />
        <span>Pending</span>
      </span>
      <span className="flex space-x-2 items-center px-4 py-2">
        <img src={Completed} className="w-4 fill-cyan-500 stroke-zinc-200" />
        <span>Completed</span>
      </span>
      <span className="flex space-x-2 items-center px-4 py-2">
        <img src={Calender} className="w-4 stroke-zinc-200" />
        <span>Calender</span>
      </span>
    </div>
  );
}

export default LeftSideBar;
