import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState({});

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  async function getAllDoctors() {
    try {
      const { data } = await axios.get(backendURL + "/api/admin/all-doctors", {
        headers: { aToken },
      });
      if (data.success) {
        setDoctors(data?.doctorsData);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  async function getAllAppointments() {
    try {
      const { data } = await axios.get(
        backendURL + "/api/admin/all-appointments",
        {
          headers: { aToken },
        }
      );
      if (data?.success) {
        setAppointments(data?.appointmentData);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  async function changeAvailability(docId) {
    try {
      const { data } = await axios.post(
        backendURL + "/api/admin/change-availability",
        { docId },
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        getAllDoctors();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  async function getDashboardData() {
    try {
      const { data } = await axios.get(backendURL + "/api/admin/dashboard", {
        headers: { aToken },
      });

      if (data.success) {
        setDashboardData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    getAllAppointments();
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
    backendURL,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    getAllAppointments,
    dashboardData,
    getDashboardData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
