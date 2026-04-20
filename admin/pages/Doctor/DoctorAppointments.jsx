import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../src/assets_admin/assets";

const DoctorAppointments = () => {
  const { currency, calculateAge, dateOfAppointment } = useContext(AppContext);
  const {
    appointments,
    getAllAppointments,
    dToken,
    backendURL,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    getAllAppointments();
  }, [dToken,getAllAppointments]);

  return (
    <div className="m-5 max-w-5xl">
      <p className="text-lg mb-3 font-medium text-gray-600">All Appointments</p>
      <div className="rounded border border-gray-400 text-sm overflow-y-scroll bg-white text-gray-500 min-h-[60vh]">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_1fr] gap-4  font-medium border-b border-gray-400 px-3 py-1">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_1fr] gap-4 items-center px-3 py-1 font-medium border-b border-gray-300 "
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex flex-wrap items-center gap-2">
              <img
                src={item?.userData?.image}
                alt=""
                width="30"
                className="rounded-full"
              />
              <p>{item?.userData?.name}</p>
            </div>
            <p className="text-xs border rounded-full text-center w-15">
              {item?.payment ? "Online" : "CASH"}
            </p>
            <p className="max-sm:hidden">{calculateAge(item?.userData.dob)}</p>
            <p>
              {dateOfAppointment(item?.slotDate)} | {item?.slotTime}
            </p>
            <p>{currency + item?.docData.fees}</p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs">Completed</p>
            ) : (
              <div className="flex gap-2">
                <button
                  className="border rounded-full  w-[50%] mx-auto hover:text-white cursor-pointer bg-rose-100 hover:bg-red-400 "
                  onClick={() => {
                    cancelAppointment(item?._id);
                  }}
                >
                  X
                </button>
                <button
                  className="border rounded-full  w-[50%] mx-auto hover:text-white cursor-pointer bg-green-100 hover:bg-green-400 "
                  onClick={() => {
                    completeAppointment(item?._id);
                  }}
                >
                  ✓
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
