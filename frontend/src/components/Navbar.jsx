import { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  return (
    <div className="flex justify-between items-center border-b-2 border-b-gray-300 pb-3">
      <NavLink to={"/"} className={"max-md:flex-1 "}>
        <img
          src={assets.aidconnect2}
          alt=""
          width={"65px"}
          className="rounded-lg cursor-pointer "
        />
      </NavLink>
      <div>
        <ul className="hidden md:flex justify-between items-center gap-4 font-semibold">
          <NavLink to={"home"}>
            <li>Home</li>
            <hr className="  border-none w-8/12 h-0.5 m-auto bg-gray-400 hidden rounded-sm" />
          </NavLink>

          <NavLink to={"doctors"}>
            <li>All Doctors</li>
            <hr className="  border-none w-8/12 h-0.5 m-auto bg-gray-400 hidden rounded-sm" />
          </NavLink>

          <NavLink to={"about"}>
            <li>About</li>
            <hr className="  border-none w-8/12 h-0.5 m-auto bg-gray-400 hidden rounded-sm" />
          </NavLink>

          <NavLink to={"contact"}>
            <li>Contact</li>
            <hr className="  border-none w-8/12 h-0.5 m-auto bg-gray-400 hidden rounded-sm " />
          </NavLink>
        </ul>
      </div>
      <div>
        {token && userData ? (
          <div className="flex cursor-pointer relative group">
            <img src={userData.image} alt="" className="w-10 rounded-full" />
        
            <img src={assets.dropdown_icon} alt="" className="w-4 " />
            <div className="text-gray-500 pt-18 text-nowrap text-base font-semibold hidden group-hover:block absolute top-0 right-0 z-1">
              <div className="min-w-48 bg-slate-100 p-4  rounded-xl flex flex-col gap-4 border-2 border-gray-300">
                <p
                  className="hover:text-shadow-md"
                  onClick={() => {
                    navigate("my-profile");
                  }}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-shadow-md"
                  onClick={() => {
                    navigate("my-appointments");
                  }}
                >
                  My Appointments
                </p>
                <p
                  className="hover:text-shadow-md"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken(false);
                    navigate("/");
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("login");
            }}
            className=" md:block bg-blue-400 py-2 px-3 hover:bg-blue-600 font-medium cursor-pointer text-white text-sm rounded-xl"
          >
            Create Account
          </button>
        )}
      </div>
      <img
        src={assets.menu_icon}
        alt="menu_image"
        onClick={() => setShowMenu(true)}
        className="md:hidden"
      />
      <div
        className={`${
          showMenu ? "fixed w-full h-full" : "w-0 h-0  "
        } md:hidden z-1 top-0 right-0 overflow-hidden bg-blue-50 transition-all delay-500`}
      >
        <div className=" flex items-center justify-between m-2 pb-2 border-b-2 border-gray-500">
          <img
            src={assets.aidconnect2}
            alt=""
            className="md:hidden w-[65px] rounded-md "
          />
          <img
            src={assets?.cross_icon}
            alt="cross_icon"
            onClick={() => setShowMenu(false)}
            className="w-[35px] border-1 mr-2 rounded-lg"
          />
        </div>
        <ul className="flex flex-col items-center gap-6 text-xl font-medium text-gray-600 mt-4">
          <NavLink onClick={() => setShowMenu(false)} to={"home"}>
            Home
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"doctors"}>
            All Doctors
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"about"}>
            About
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"contact"}>
            Contact
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
