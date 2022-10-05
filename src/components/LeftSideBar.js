import React from "react";
import All from "@heroicons/react/24/outline/Squares2X2Icon";
import Pending from "@heroicons/react/24/outline/ClockIcon";
import Completed from "@heroicons/react/24/outline/CheckCircleIcon";
import Calender from "@heroicons/react/24/outline/CalendarIcon";
import { useRecoilState } from "recoil";
import { sideNavAtom } from "../atoms/Sidenav";

function LeftSideBar() {
  const [sideNav, setSideNav] = useRecoilState(sideNavAtom);
  const handleChangeNav = (val) => {
    setSideNav(val);
  };

  return (
    <div className="bg-white drop-shadow-2xl rounded-md w-1/6 flex flex-col space-y-3 px-3 py-6">
      <span
        onClick={() => handleChangeNav("All")}
        className={
          "flex space-x-2 items-center  rounded-sm px-3 py-2 cursor-pointer" +
          (sideNav === "All" ? " bg-blue-600 text-white" : " bg-white text-gray-700")
        }
      >
        <All className={"w-5" + (sideNav === "All" ? " text-white" : " text-blue-600")} />
        <span>All</span>
      </span>
      <span
        onClick={() => handleChangeNav("Pending")}
        className={
          "flex space-x-2 rounded-sm items-center px-3 py-2 cursor-pointer" +
          (sideNav === "Pending" ? " bg-blue-600 text-white" : " bg-white text-gray-700")
        }
      >
        <Pending className={"w-5" + (sideNav === "Pending" ? " text-white" : " text-blue-600")} />
        <span>Pending</span>
      </span>
      <span
        onClick={() => handleChangeNav("Completed")}
        className={
          "flex space-x-2 rounded-sm items-center px-3 py-2 cursor-pointer" +
          (sideNav === "Completed" ? " bg-blue-600 text-white" : " bg-white text-gray-700")
        }
      >
        <Completed
          className={"w-5" + (sideNav === "Completed" ? " text-white" : " text-blue-600")}
        />
        <span>Completed</span>
      </span>
      <span
        onClick={() => handleChangeNav("Calender")}
        className={
          "flex space-x-2 items-center rounded-sm px-3 py-2 cursor-pointer" +
          (sideNav === "Calender" ? " bg-blue-600 text-white" : " bg-white text-gray-700")
        }
      >
        <Calender className={"w-5" + (sideNav === "Calender" ? " text-white" : " text-blue-600")} />
        <span>Calender</span>
      </span>
    </div>
  );
}

export default LeftSideBar;
