const validator = require('validator');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const cloudinary = require('cloudinary').v2;
const Razorpay = require('razorpay');

//API for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const searchUser = await userModel.findOne({ email });
    if (searchUser) {
      return res.json({
        success: false,
        message: 'User already exists ! Please Log in',
      });
    }
    if (!name || !email || !password) {
      res.json({ success: false, message: 'Missing Credentials' });
    }

    //   validating email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter valid email' });
    }

    //   validating password
    if (password.length < 8) {
      return res.json({ success: false, message: 'Enter strong password' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = { name, email, password: hashedPassword };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user?.password);

    if (isMatch) {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return res.json({ success: true, token });
    }
    return res.json({
      success: false,
      message: 'Invalid Credentials',
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for getting profile

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select({ password: 0 });
    return res.json({ success: true, userData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API for updating profile

const updateProfile = async (req, res) => {
  try {
    const { userId, name, dob, address, phone, gender } = req.body;
    const imageFile = req.file;

    if (!name || !dob || !address || !phone || !gender) {
      return res.json({ success: false, message: 'Missing data' });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      dob,
      address: JSON.parse(address),
      phone,
      gender,
    });

    if (imageFile) {
      const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      const uploadImageUrl = uploadImage.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: uploadImageUrl });
    }

    res.json({
      success: true,
      message: 'Profile Updated',
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api for booking appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select({ password: 0 });
    if (!docData) {
      return res.json({ success: false, message: 'Doctor not found' });
    }
    if (!docData?.available) {
      return res.json({ success: false, message: 'Doctor not available' });
    }
    let { slots_booked } = docData;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot not available' });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    delete docData.slots_booked;

    const userData = await userModel.findOne({ _id: userId }).select('-password');

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData?.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // saving new slots data in docData

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: 'Your appointment has been booked',
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to list appointments
const listAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointmentData = await appointmentModel.find({ userId });
    return res.json({ success: true, appointmentData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req?.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData?.userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized Action' });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;

    const docData = await doctorModel.findById(docId);

    let { slots_booked } = docData;

    let indexToRemove = slots_booked[slotDate].findIndex((item) => item === slotTime);
    slots_booked[slotDate].splice(indexToRemove, 1);

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({
      success: true,
      message: 'Appointment Cancelled',
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to make appointment payments using razorpay
const razorpayInstance = new Razorpay({
  key_id: process.env.razorpay_api_key,
  key_secret: process.env.razorpay_secret_key,
});

const razorpay_Payment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment || appointment?.cancelled) {
      return res.json({
        success: false,
        message: 'Appointment cancelled or not found',
      });
    }

    // creating options for razor payment
    const options = {
      amount: appointment?.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // creation of an order
    const order = await razorpayInstance.orders.create(options);
    return res.json({ success: true, order });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
// api to verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: 'true',
      });
      return res.json({ success: true, message: 'Payment Successful' });
    } else {
      return res.json({ success: false, message: 'Payment Unsuccessful' });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  razorpay_Payment,
  verifyPayment,
};
