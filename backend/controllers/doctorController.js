const doctorModel = require('../models/doctorModel.js');
const appointmentModel = require('../models/appointmentModel.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData?.available,
    });
    res.json({ success: true, message: 'Availability Changed' });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error?.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctorsData = await doctorModel.find().select(['-password', '-email']);
    res.json({ success: true, doctorsData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctorData = await doctorModel.findOne({ email });
    if (!doctorData) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, doctorData?.password);
    if (isMatch) {
      const token = await jwt.sign({ id: doctorData._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments for doctor panel

const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    return res.json({ success: true, appointments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//API to cancel appointment for doctor dashboard

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (
      appointmentData &&
      appointmentData.docId === docId &&
      Object.keys(appointmentData).length !== 0
    ) {
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
    } else {
      return res.json({
        success: false,
        message: 'Appointment Not Found Or Cancelled',
      });
    }
  } catch (error) {
    return res.json({ success: false, message: err.message });
  }
};

// API to complete the appointment

const completeAppointment = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (
      appointmentData &&
      appointmentData.docId === docId &&
      Object.keys(appointmentData).length !== 0
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: 'Appointment Completed' });
    }
    return res.json({
      success: false,
      message: 'Marked Failed',
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Api for doctor dashboard data

const docDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item?.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      patients: patients.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select('-password');
    if (!profileData || Object.keys(profileData).length == 0) {
      return res.json({ success: false, message: 'Profile Not Found' });
    }
    return res.json({ success: true, profileData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to update profile from doctor panel

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;
    // console.log(fees, address, available, "fees", "Address", "available");

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    return res.json({ success: true, message: 'Profile Updated' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  changeAvailability,
  getAllDoctors,
  doctorLogin,
  doctorAppointments,
  cancelAppointment,
  completeAppointment,
  docDashboard,
  doctorProfile,
  updateDoctorProfile,
};
