import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-[85rem] h-24 bg-white border flex justify-evenly items-center ">
      <div className="font-bold text-2xl flex flex-1 ml-10">
        <h1>
          <Link to="/body">Dashboard</Link>
        </h1>
      </div>
      <div className="flex gap-8 mr-10">
        <div>
          <input
            placeholder="Search for something"
            className=" rounded-full bg-slate-100 w-[20rem] h-14 p-5"
          />
        </div>
        <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center">
          <IoSettingsOutline className="w-7 h-7 text-slate-500" />
        </div>
        <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center">
          <FaRegBell className="w-7 h-7 text-red-500" />
        </div>
        <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center">
          <FaRegUser className="w-7 h-7 text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
