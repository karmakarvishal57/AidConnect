import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendURL } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          backendURL + "/api/admin/admin-login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          navigate("/");
        } else toast.error(data.message);
      } else if (state === "Doctor") {
        const { data } = await axios.post(
          backendURL + "/api/doctor/doctor-login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          navigate("/");
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <form
        className="min-h-[80vh] flex items-center justify-center "
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col gap-4 min-w-[40%] sm:min-w-96 bg-blue-100 text-sm font-semibold border border-gray-300 p-8 shadow-lg rounded-xl text-[#5E5E5E]">
          <p className="text-2xl m-auto">
            <span className="text-[#204dca]">{state} </span>Login
          </p>
          <div>
            <p>Email </p>
            <input
              type="email"
              name="Email"
              id="Email"
              required
              className="bg-white rounded-md h-5 w-[100%] p-3 mt-1 border border-[#DADADA]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p>Password </p>
            <input
              type="password"
              name="Password"
              id="Password"
              required
              className="bg-white rounded-md h-5 w-[100%] p-3 mt-1 border border-[#DADADA]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="rounded-lg bg-blue-300 hover:bg-blue-400 text-white transition-all duration-300  p-1">
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Doctor ?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-700 cursor-pointer underline"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p>
              Admin ?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-700 cursor-pointer underline"
              >
                Login Here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default login;
