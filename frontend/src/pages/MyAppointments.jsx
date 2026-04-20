import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const MyAppointments = () => {
  const { backendURL, token, getAllDoctors } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);
  const navigate = useNavigate();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dateOfAppointment = (slotDate) => {
    let date = slotDate.split('_');
    return date[0] + ' ' + months[Number(date[1]) - 1] + ' ' + date[2];
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        backendURL + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        appointmentsList();
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const init_pay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      amount: order?.amount,
      currency: order?.currency,
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendURL + '/api/user/verify-payment', response, {
            headers: { token },
          });
          if (data.success) {
            appointmentsList();
            navigate('/my-appointments');
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = window.Razorpay(options);
    rzp.open();
  };

  const payment_razorPay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } },
      );
      if (data.success) {
        init_pay(data?.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  async function appointmentsList() {
    try {
      const { data } = await axios.get(backendURL + '/api/user/list-appointment', {
        headers: { token },
      });
      if (data.success) {
        setAppointment(data?.appointmentData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    appointmentsList();
  }, []);
  return (
    <div className="text-zinc-600 ">
      <p className="border-b-2 border-gray-400 py-4 font-medium">My Appointments</p>
      <div>
        {appointment.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_2fr] text-sm gap-4 py-4 border-b-2 border-gray-300 sm:flex ">
            <div  className="sm:w-30 ">
              <img
                src={item?.docData?.image}
                alt={'doctors_img'}
                className="bg-gray-100 w-[100%] rounded"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold text-neutral-600">{item?.docData?.name}</p>
              <p className="font-medium">{item?.docData.speciality}</p>
              <p className="font-semibold mt-1">Address : </p>
              <p className="text-xs font-medium">{item?.docData.address.line1}</p>
              <p className="text-xs font-medium">{item?.docData.address.line2}</p>
              <p className="font-medium text-xs mt-1">
                <span className="font-semibold text-sm">Date & Time : </span>
                {dateOfAppointment(item?.slotDate)} | {item?.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col justify-end gap-2 ">
              {!item.cancelled && !item?.isCompleted && item.payment ? (
                <button className="bg-indigo-100 p-2 rounded outline min-w-50">Paid</button>
              ) : null}
              {!item.cancelled && !item.payment && !item?.isCompleted ? (
                <button
                  className="rounded-sm bg-blue-50 hover:bg-blue-500 hover:text-white  cursor-pointer p-2 border-1 items-center transition-all min-w-50"
                  onClick={() => payment_razorPay(item._id)}
                >
                  Pay Online
                </button>
              ) : null}
              {!item.cancelled && !item?.isCompleted ? (
                <button
                  className="rounded-sm cursor-pointer bg-red-50 hover:bg-red-500 hover:text-white p-2 border-1 transition-all min-w-50"
                  onClick={() => {
                    cancelAppointment(item._id);
                  }}
                >
                  Cancel
                </button>
              ) : null}
              {item.cancelled ? (
                <button className="rounded-sm p-2 border-1  min-w-50 bg-red-50 text-red-500">
                  Cancelled
                </button>
              ) : null}
              {item.isCompleted ? (
                <button className="rounded-sm p-2 border-1 min-w-50 bg-green-50 text-green-500">
                  Completed
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
