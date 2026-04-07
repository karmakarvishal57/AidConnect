import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between bg-blue-500 rounded-xl lg:px-10 md:px-8 mt-20 ">
      {/*--------------Left Content -------------*/}
      <div className="flex-1 py-10 px-16 text-white gap-4">
        <div className="text-xl md:text-3xl sm:text-2xl lg:text-4xl font-semibold flex flex-col gap-3">
          <p>Book Appointment</p>
          <p>With 100+ Trusted Doctors</p>
        </div>

        <button
          className="bg-white text-blue-600  rounded-2xl py-2 px-4 font-semibold mt-4 cursor-pointer"
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
        >
          Create Account
        </button>
      </div>
      {/*--------------Right Content -------------*/}
      <div className=" relative md:w-[370px] hidden md:block ">
        <img
          src={assets.appointment_img}
          alt="appointment_image"
          className="absolute bottom-0 right-10 w-[70%]"
        />
      </div>
    </div>
  );
};

export default Banner;
