import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Appointment() {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState({});
  const { doctors, currencySymbol, getAllDoctors, backendURL, token } = useContext(AppContext);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const fetchDocInfo = () => {
    setDocInfo(doctors.find((doc) => docId === doc._id));
  };

  const getAvailableSlots = () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();

      // getting date with index

      currentDate.setDate(currentDate.getDate() + i);

      // setting endtime of currentDate with index

      let endTime = new Date(currentDate);

      endTime.setHours(21, 0, 0, 0);

      // setting hours for appointments

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        let slotDate = day + '_' + month + '_' + year;
        let slotTime = formattedTime;

        const isSlotAvailable =
          docInfo?.slots_booked?.[slotDate] && docInfo?.slots_booked?.[slotDate]?.includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            slot: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0]?.dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let slotDate = day + '_' + month + '_' + year;

      const { data } = await axios.post(
        backendURL + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, []);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    <div>
      {/* -----------------Doc Details------------------- */}

      <div className="flex flex-col sm:flex-row gap-4 mt-8 ">
        <div className="">
          <img
            src={docInfo?.image}
            alt="docInfoImage"
            className="bg-blue-500 rounded-lg min-w-full sm:max-w-72 "
          />
        </div>

        {/* ----------------- Doc Info - name,experience ---------------- */}

        <div className="flex-2 border-2 border-gray-400 rounded-lg p-8 py-7 ">
          <p className="flex items-center gap-2 text-2xl font-semibold">
            {docInfo.name}
            <img src={assets.verified_icon} alt="verified_image" className="w-6" />
          </p>
          <div className="flex text-sm gap-2 text-gray-600 font-medium mt-2 text-nowrap">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="border-2 border-gray-400 rounded-full px-2 text-xs">
              {docInfo.experience}
            </button>
          </div>

          {/* ----------- Doc About ------------- */}

          <div>
            <p className="flex items-center gap-1 text-sm text-gray-900 font-medium mt-2">
              About <img src={assets.info_icon} alt="" className="w-3" />
            </p>
            <p className="text-sm text-gray-600 font-medium mt-2">{docInfo.about}</p>
            <p className="text-sm  font-medium mt-2 text-gray-500">
              Appointment Fees :<span> {currencySymbol + docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* -------- Booking Slots --------- */}

      <div className="sm:ml-72 mt-4 sm:pl-4 font-medium text-gray-600">
        <p>Booking Slots</p>
        <div className="flex gap-3 mt-4 overflow-x-scroll">
          {docSlots.map((item, idx) =>
            item.length ? (
              <div
                key={idx}
                className={`text-center cursor-pointer rounded-full py-4 min-w-16 ${
                  slotIndex === idx ? 'bg-blue-500 text-white' : 'bg-white shadow'
                }`}
                onClick={() => setSlotIndex(idx)}
              >
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ) : null,
          )}
        </div>
        <div className="flex gap-3 overflow-x-auto mt-6 w-full">
          {docSlots.length &&
            docSlots[slotIndex].map((item, idx) => (
              <p
                key={idx}
                className={`flex-shrink-0 font-light cursor-pointer px-4 py-2 rounded-full  ${
                  item.slot === slotTime
                    ? 'bg-blue-400 text-white'
                    : 'bg-white border-2 border-gray-300'
                }`}
                onClick={() => setSlotTime(item.slot)}
              >
                {item.slot}
              </p>
            ))}
        </div>
        <button
          className="mt-8 bg-blue-400 px-10 py-3 rounded-full text-white font-light cursor-pointer"
          onClick={bookAppointment}
        >
          Book An Appointment
        </button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
}

export default Appointment;
