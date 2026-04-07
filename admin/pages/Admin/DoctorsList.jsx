import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { aToken, doctors, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
  useEffect(() => {
    getAllDoctors();
  }, [aToken]);
  return (
    <div className="p-4  max-h-[90vh] overflow-y-scroll ">
      <h1 className="text-xl font-medium">All Doctors</h1>
      <div className="grid md:grid-cols-4 max-md:grid-cols-2  gap-3 mt-4 ">
        {doctors?.map((item, index) => (
          <div
            className=" rounded-lg group border border-gray-300 cursor-pointer max-w-max"
            key={index}
          >
             <img
              src={item.image}
              alt=""
              className="bg-indigo-50 group-hover:bg-blue-500 transition-all duration-500 rounded-t-lg"
            />
            <div className=" text-gray-600 py-3 px-2 ">
              <p className="font-medium">{item?.name}</p>
              <p className="text-sm text-zinc-500 font-medium">
                {item?.speciality}
              </p>
            </div>
            <div className="px-2 mb-2 flex gap-1 items-center">
              <input
                type="checkbox"
                checked={item.available}
                onChange={() => {
                  changeAvailability(item?._id);
                }}
              />
              <p className="text-sm">Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
