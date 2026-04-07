import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../src/assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-3 text-xs ">
        <img
          className="cursor-pointer w-15  rounded-2xl"
          src={assets.adminDashboardImage}
          alt="AidConnect Logo"
        />
        <p className="text-gray-500 font-medium border-2 border-gray-400 rounded-xl px-2">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={() => {
          aToken && localStorage.removeItem("aToken");
          aToken && setAToken("");
          dToken && localStorage.removeItem("dToken");
          dToken && setDToken("");
        }}
        className="bg-blue-500 px-4 py-1.5 rounded-2xl text-white cursor-pointer text-sm font-medium "
      >
        Logout
      </button>
    </div>
  );
};

export { Navbar };
