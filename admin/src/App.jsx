import React, { useContext } from "react";
import Login from "../pages/login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { Navbar } from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import AllAppointments from "../pages/Admin/AllAppointments";
import DoctorsList from "../pages/Admin/DoctorsList";
import AddDoctor from "../pages/Admin/AddDoctor";
import "./App.css";
import { DoctorContext } from "../context/DoctorContext";
import DoctorAppointments from "../pages/Doctor/DoctorAppointments";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import DoctorProfile from "../pages/Doctor/DoctorProfile";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <Navbar />
      <div className="flex ">
        <div className="bg-white">
          <Sidebar />
        </div>
        <div className="min-h-[90vh]">
          <Routes>
            {/* Admin Route */}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/doctors-list" element={<DoctorsList />} />
            <Route path="/add-doctor" element={<AddDoctor />} />

            {/* Doctor Route */}
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
}

export default App;
