import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../src/assets_admin/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const Dashboard = () => {
  const {
    aToken,
    dashboardData,
    getDashboardData,
    backendURL,
    getAllAppointments,
  } = useContext(AdminContext);
  const { dateOfAppointment } = useContext(AppContext);
  useEffect(() => {
    getDashboardData();
  }, [aToken]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        backendURL + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data?.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };
  return (
    dashboardData && (
      <div className="m-5">
        <div className="flex flex-wrap   gap-3 text-sm text-gray-500 font-semibold">
          <div className="flex  items-center gap-2 w-50  bg-white rounded border-2 border-gray-200 hover:cursor-pointer hover:scale-105 transition-all p-4">
            <img width="56px" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-lg">{dashboardData?.doctors}</p>
              <p>Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-max bg-white rounded border-2 border-gray-200 hover:cursor-pointer hover:scale-105 transition-all p-4">
            <img src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-lg">{dashboardData?.appointments}</p>
              <p>Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-50 bg-white rounded border-2 border-gray-200 hover:cursor-pointer hover:scale-105 transition-all p-4">
            <img src={assets.patients_icon} alt="" />
            <div>
              <p className="text-lg">{dashboardData?.patients}</p>
              <p>Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-10 border rounded border-gray-300">
          <div className="flex px-2.5 py-4 gap-2.5 items-center border-b border-b-gray-300">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold text-gray-600">Latest Bookings</p>
          </div>
          <div>
            {dashboardData?.latestAppointments?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-3 text-sm border-b border-b-gray-300"
              >
                <img
                  className="w-14 rounded-full "
                  src={item?.docData?.image}
                  alt=""
                />
                <div className="flex-1 text-sm font-semibold">
                  <p className="text-gray-800">{item?.docData?.name}</p>
                  <p className="text-gray-600 text-xs">
                    {dateOfAppointment(item?.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="font-semibold text-red-400">Cancelled</p>
                ) : !item.isCompleted ? (
                  <button
                    className="hover:bg-red-400 rounded px-4 py-2 border text-rose-400 mr-3 font-semibold hover:text-white hover:cursor-pointer"
                    onClick={() => {
                      cancelAppointment(item?._id);
                    }}
                  >
                    X
                  </button>
                ) : (
                  <p className="font-semibold text-green-400">Completed</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
