import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-4 mt-20">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="text-sm w-2/5 text-center mt-2">
        Browse Through Our Extensive List Of Doctors, Schedule Your Appointment
        Hassle Free
      </p>
      <div className="flex gap-4 pt-5 overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item?.speciality}` }
            className="flex flex-col justify-center shrink-0 pb-4 text-xs flex-wrap hover:-translate-y-2  transition-all duration-300 text-center" onClick={()=>{scrollTo({top:100,left:100})}}
          >
            <img
              src={item?.image}
              alt="speciality_image"
              className="w-22 mb-2"
            />
            <p>{item?.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
