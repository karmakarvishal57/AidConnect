import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import { assets } from '../../src/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { backendURL, dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { dateOfAppointment, currency } = useContext(AppContext);
  const [dashData, setDashData] = useState([]);
  const dashBoardData = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/doctor/dashBoard', {
        headers: { dToken },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchDashData = async () => {
      await dashBoardData();
    };

    fetchDashData();
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 font-semibold">
          <div className="flex items-center gap-2 min-w-50 bg-white rounded border-2 border-gray-200 hover:cursor-pointer hover:scale-105 transition-all p-4">
            <img width="56px" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-lg">{dashData?.earnings + ' ' + currency}</p>
              <p>Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-44 bg-white rounded border-2 border-gray-200 hover:cursor-pointer hover:scale-105 transition-all p-4">
            <img src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-lg">{dashData?.appointments}</p>
              <p>Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-50 bg-white rounded border-2 border-gray-200 hover:cursor-pointer hover:scale-105 transition-all p-4">
            <img src={assets.patients_icon} alt="" />
            <div>
              <p className="text-lg">{dashData?.patients}</p>
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
            {dashData?.latestAppointments?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-3 text-sm border-b border-b-gray-300"
              >
                <img className="w-14 rounded-full " src={item?.userData?.image} alt="" />
                <div className="flex-1 text-sm font-semibold">
                  <p className="text-gray-800">{item?.userData?.name}</p>
                  <p className="text-gray-600 text-xs">{dateOfAppointment(item?.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium ">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-400 text-xs font-medium">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="border rounded-full  w-[50%] px-4  mx-auto hover:text-white cursor-pointer bg-rose-100 hover:bg-red-400 "
                      onClick={() => {
                        cancelAppointment(item?._id);
                      }}
                    >
                      X
                    </button>
                    <button
                      className="border rounded-full  w-[50%] mx-auto px-4 hover:text-white cursor-pointer bg-green-100 hover:bg-green-400 "
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
      </div>
    )
  );
};

export default DoctorDashboard;
