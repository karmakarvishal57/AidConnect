import { Link } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

function Header() {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-blue-500 rounded-xl relative w-[100%] mt-1 items-center">
        {/*Left side of header content */}
        <div className="md:order-1 order-2 flex flex-col py-10 px-6 mx-auto justify-center max-md:items-center gap-5 max-md:text-center">
          <p className="text-4xl font-bold text-white">
            Book Appointment Now <br /> With Trusted Doctors
          </p>
          <div className="flex flex-col md:flex-row items-center  text-white font-light gap-3">
            <img src={assets.group_profiles} alt="" />
            <p>
              Ease your browsing through our extensive list of best doctors,
              <br />
              schedule your appointment
            </p>
          </div>
          <a
            href="#speciality"
            className="text-blue-900 flex flex-row  gap-2 items-center rounded-xl bg-white w-50 pl-4"
          >
            Book Appointment <img src={assets.arrow_icon} />
          </a>
        </div>
        {/*Right side of header content */}
        <div className="md:order-2 w-[100%] md:w-[50%] order-1 ">
          <img className=" rounded-2xl " src={assets.header_img} />
        </div>
      </div>
    </>
  );
}

export default Header;
