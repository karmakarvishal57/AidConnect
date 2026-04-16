import React from 'react';
import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const AllAppointments = () => {
  const { appointments, aToken, backendURL, getAllAppointments } = useContext(AdminContext);
  const { calculateAge, dateOfAppointment, currency } = useContext(AppContext);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        backendURL + '/api/admin/cancel-appointment',
        { appointmentId },
        { headers: { aToken } },
      );
      if (data?.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="m-5 w-full max-w-6xl">
      <p className="mb-4 text-xl font-medium">All Appointments</p>
      <div className="bg-white max-h-[90vh] min-h-[60vh] text-sm border border-gray-300 rounded font-semibold text-gray-600 overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]  px-6 py-3 border-b border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments?.map((item, index) => (
          <div className=" grid max-md:gap-4 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] max-sm:grid-cols-[2fr_1fr_2fr] px-6 py-3  items-center border-b border-gray-300 hover:bg-gray-50">
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img src={item?.userData?.image} alt="" className=" w-8 rounded-full" />
              <p>{item?.userData?.name}</p>
            </div>
            <p>{calculateAge(item?.userData?.dob)}</p>
            <p>
              {dateOfAppointment(item?.slotDate)} | {item?.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                src={item?.docData?.image}
                alt=""
                className=" w-8 rounded-full bg-[rgb(89,137,247)]"
              />
              <p>{item?.docData?.name}</p>
            </div>
            <p>{currency + ' ' + item?.docData.fees}</p>
            {item?.cancelled ? (
              <p className="text-red-400 text-xs">Cancelled</p>
            ) : !item.isCompleted ? (
              <button
                className="border rounded-full w-[50%] mx-auto hover:text-white cursor-pointer hover:bg-red-400 "
                onClick={() => {
                  cancelAppointment(item?._id);
                }}
              >
                X
              </button>
            ) : (
              <p className="text-green-400 text-xs">Completed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
