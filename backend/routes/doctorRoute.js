const express = require("express");
const {
  getAllDoctors,
  doctorLogin,
  doctorAppointments,
  cancelAppointment,
  completeAppointment,
  docDashboard,
  doctorProfile,
  updateDoctorProfile,
} = require("../controllers/doctorController");
const authDoctor = require("../middlewares/authDoctor");

const doctorRouter = express.Router();

doctorRouter.get("/list", getAllDoctors);
doctorRouter.post("/doctor-login", doctorLogin);
doctorRouter.get("/appointments", authDoctor, doctorAppointments);
doctorRouter.put("/cancel-appointment", authDoctor, cancelAppointment);
doctorRouter.put("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.get("/dashBoard", authDoctor, docDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.put("/update-profile", authDoctor, updateDoctorProfile);

module.exports = doctorRouter;
