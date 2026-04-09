const express = require('express');
const {
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  razorpay_Payment,
  verifyPayment,
} = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');
const authUser = require('../middlewares/authUser');
const upload = require('../middlewares/multer');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.put('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/list-appointment', authUser, listAppointments);
userRouter.put('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/payment-razorpay', authUser, razorpay_Payment);
userRouter.post('/verify-payment', authUser, verifyPayment);
module.exports = userRouter;
