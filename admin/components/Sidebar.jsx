import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../src/assets_admin/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  if (aToken)
    return (
      <ul className="mt-5  text-[#515151]  text-nowrap w-60 max-md:w-15">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 md:px-10 md:w-full  ${
              isActive ? `bg-blue-50 border-r-3 border-blue-600` : ""
            }`
          }
        >
          <img src={assets.home_icon} alt="Dashboard" />
          <p className="max-md:hidden">Dashboard</p>
        </NavLink>
        <NavLink
          to="/all-appointments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 md:px-10 md:w-full ${
              isActive ? `bg-blue-50 border-r-3 border-blue-600` : ""
            }`
          }
        >
          <img src={assets.appointment_icon} alt="All Appointments" />
          <p className="max-md:hidden">Appointments</p>
        </NavLink>
        <NavLink
          to="/add-doctor"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 md:px-10 md:w-full ${
              isActive ? `bg-blue-50 border-r-3 border-blue-600` : ""
            }`
          }
        >
          <img src={assets.add_icon} alt="Add Doctor" />
          <p className="max-md:hidden">Add Doctor</p>
        </NavLink>
        <NavLink
          to={"/doctors-list"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 md:px-10 md:w-full  ${
              isActive ? `bg-blue-50 border-r-3 border-blue-600` : ""
            }`
          }
        >
          <img src={assets.people_icon} alt="Doctors List" />
          <p className="max-md:hidden">Doctors List</p>
        </NavLink>
      </ul>
    );
  else if (dToken) {
    return (
      <ul className="mt-5  text-[#515151] text-nowrap  w-60 max-md:w-15">
        <NavLink
          to="/doctor-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 md:px-10 w-full ${
              isActive ? `bg-blue-50 border-r-3 border-blue-600` : ""
            }`
          }
        >
          <img src={assets.home_icon} alt="Dashboard" />
          <p className="max-md:hidden">Dashboard</p>
        </NavLink>
        <NavLink
          to="/doctor-appointments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 md:px-10  ${
              isActive ? `bg-blue-50 border-r-3 border-blue-600` : ""
            }`
          }
        >
          <img src={assets.appointment_icon} alt="Doctor Appointments" />
          <p className="max-md:hidden">Appointments</p>
        </NavLink>
        <NavLink
          to={"/doctor-profile"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 md:px-10 ${
              isActive ? `bg-blue-50 border-r-3 border-blue-600` : ""
            }`
          }
        >
          <img src={assets.docProfile} alt="Doctors Profile" width="30" />
          <p className="pr-6 max-md:hidden ">Doctor Profile</p>
        </NavLink>
      </ul>
    );
  }
};

export default Sidebar;
