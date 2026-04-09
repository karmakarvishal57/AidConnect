const express = require('express');

const upload = require('../middlewares/multer');
const {
  addDoctor,
  allDoctors,
  adminLogin,
  allAppointments,
  cancelAppointment,
  adminDashboard,
} = require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');
const { changeAvailability } = require('../controllers/doctorController');

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/admin-login', adminLogin);
adminRouter.get('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/all-appointments', authAdmin, allAppointments);
adminRouter.put('/cancel-appointment', authAdmin, cancelAppointment);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

module.exports = adminRouter;
