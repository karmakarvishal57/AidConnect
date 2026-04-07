import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelatedDoctors(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className=" flex flex-col items-center my-7 text-gray-900 md:mx-10 mt-20">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-8">
        {relatedDoctors.slice(0, 5).map((item, idx) => (
          <div
            key={item?._id}
            className=" border border-blue-200 rounded-lg hover:-translate-y-2.5 cursor-pointer duration-300 "
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              scrollTo(0, 0);
            }}
          >
            <img src={item.image} alt="image" className="bg-blue-50" />
            <div className="p-4">
              <div
                className={`flex items-center gap-1 text-xs ${
                  item?.available ? "text-green-400" : "text-red-400"
                } `}
              >
                <p
                  className={`w-1 h-1 ${
                    item?.available ? "bg-green-400" : "bg-red-400"
                  }  rounded-full`}
                ></p>
                <p>{item?.available ? "Available" : "Unavailable"}</p>
              </div>
              <p className="text-lg font-semibold">{item?.speciality}</p>
              <p className=" font-medium text-gray-700">{item?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
