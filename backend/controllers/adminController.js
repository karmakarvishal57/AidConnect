//API for adding doctor

const validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const doctorModel = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      res.json({ status: "failed", message: "Missing Details" });
    }

    //   VALIDATING EMAIL
    if (!validator.isEmail(email)) {
      res.json({ status: "failed", message: "Please enter valid email" });
    }

    // VALIDATING STRONG PASSWORD
    if (password.length < 8) {
      res.json({ status: "failed", message: "Please enter strong password" });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const uploadImageUrl = uploadImage.secure_url;

    const doctorData = {
      name,
      email,
      image: uploadImageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const doctor = new doctorModel(doctorData);
    await doctor.save();
    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to get all doctors  from admin panel

const allDoctors = async (req, res) => {
  try {
    const doctorsData = await doctorModel.find().select("-password");
    res.json({ success: true, doctorsData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// api to get all appointment list from admin panel

const allAppointments = async (req, res) => {
  try {
    const appointmentData = await appointmentModel.find({});
    return res.json({ success: true, appointmentData });
  } catch (error) {
    return res.json({ success: false, message: err.message });
  }
};

// api to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      const { docId, slotDate, slotTime } = appointmentData;

      const docData = await doctorModel.findById(docId);

      let { slots_booked } = docData;

      let indexToRemove = slots_booked[slotDate].findIndex(
        (item) => item === slotTime
      );
      slots_booked[slotDate].splice(indexToRemove, 1);

      await doctorModel.findByIdAndUpdate(docId, { slots_booked });

      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Appointment Not Found Or Cancelled",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: err.message });
  }
};

// api for admin dashboard

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments?.reverse().slice(0, 5),
    };
    return res.json({ success: true, dashData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = { 
  addDoctor,
  adminLogin,
  allDoctors,
  allAppointments,
  cancelAppointment,
  adminDashboard,
};
