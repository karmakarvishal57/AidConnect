import React from "react";
import axios from "axios";
import { useState, createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : false
  );
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendURL + "/api/doctor/appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data?.appointments);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        backendURL + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      console.log(data, "data");

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        backendURL + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setProfile(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendURL,
    appointments,
    getAllAppointments,
    cancelAppointment,
    completeAppointment,
    getDoctorProfile,
    profile,
    setProfile,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
