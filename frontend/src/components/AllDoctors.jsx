import React, { useState } from 'react';

const AllDoctors = ({ props }) => {
  const { doctors, speciality, filterDocs, navigate, setFilterDocs } = props;
  const [filterMenu, setFilterMenu] = useState(false);

  return (
    <div>
      <p className="text-gray-600 mt-4">Browse Through The Doctors Specialist .</p>
      <div className="flex gap-10 mt-5 max-sm:flex-col items-start">
        {/* Left Section */}
        <div>
          <button
            className={` max-w-max px-6 text-sm font-medium rounded-full mb-2 border-2 transition-all duration-300 ${
              filterMenu ? `bg-blue-400 text-white` : `bg-gray-50  border-gray-400`
            } cursor-pointer text-gray-600`}
            onClick={() => setFilterMenu(!filterMenu)}
          >
            Filter
          </button>
          <div
            className={`text-sm text-gray-600 font-medium flex-col hidden ${
              filterMenu ? `sm:block max-sm:block ` : `hidden`
            }`}
          >
            <p
              className={`border-2 border-gray-400 mb-4 rounded-2xl pl-2 pr-9 py-1  cursor-pointer ${
                speciality === 'General physician' ? 'bg-blue-200 text-black' : null
              }`}
              onClick={(e) => {
                speciality === e.target.innerText
                  ? navigate('/doctors')
                  : navigate('/doctors/' + e.target.innerText);
              }}
            >
              General physician
            </p>
            <p
              className={`border-2 border-gray-400 my-4 rounded-2xl pl-2 pr-9 py-1  cursor-pointer ${
                speciality === 'Gynecologist' ? 'bg-blue-200 text-black' : null
              }`}
              onClick={(e) => {
                speciality === e.target.innerText
                  ? navigate('/doctors/')
                  : navigate('/doctors/' + e.target.innerText);
              }}
            >
              Gynecologist
            </p>
            <p
              className={`border-2 border-gray-400 my-4 rounded-2xl pl-2 pr-9 py-1  cursor-pointer ${
                speciality === 'Dermatologist' ? 'bg-blue-200 text-black' : null
              }`}
              onClick={(e) => {
                speciality === e.target.innerText
                  ? navigate('/doctors/')
                  : navigate('/doctors/' + e.target.innerText);
              }}
            >
              Dermatologist
            </p>
            <p
              className={`border-2 border-gray-400 my-4 rounded-2xl pl-2 pr-9 py-1  cursor-pointer ${
                speciality === 'Pediatricians' ? 'bg-blue-200 text-black' : null
              }`}
              onClick={(e) => {
                speciality === e.target.innerText
                  ? navigate('/doctors')
                  : navigate('/doctors/' + e.target.innerText);
              }}
            >
              Pediatricians
            </p>
            <p
              className={`border-2 border-gray-400 my-4 rounded-2xl pl-2 pr-9 py-1  cursor-pointer ${
                speciality === 'Neurologist' ? 'bg-blue-200 text-black' : null
              }`}
              onClick={(e) => {
                speciality === e.target.innerText
                  ? navigate('/doctors/')
                  : navigate('/doctors/' + e.target.innerText);
              }}
            >
              Neurologist
            </p>
            <p
              className={`border-2 border-gray-400 my-4 rounded-2xl pl-2 pr-9 py-1  cursor-pointer ${
                speciality === 'Gastroenterologist' ? 'bg-blue-200 text-black' : null
              }`}
              onClick={(e) => {
                speciality === e.target.innerText
                  ? navigate('/doctors/')
                  : navigate('/doctors/' + e.target.innerText);
              }}
            >
              Gastroenterologist
            </p>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(150px,190px))] gap-4 gap-y-6">
          {filterDocs.map((item) => (
            <div
              key={item?._id}
              className=" border border-blue-200 rounded-lg hover:-translate-y-2.5 cursor-pointer  duration-300 "
              onClick={() => {
                navigate(`/appointments/${item._id}`);
              }}
            >
              <img src={item.image} alt="image" className="bg-blue-50" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-1 text-xs ${
                    item?.available ? 'text-green-400' : 'text-red-400'
                  } `}
                >
                  <p
                    className={`w-1 h-1 ${
                      item?.available ? 'bg-green-400' : 'bg-red-400'
                    }  rounded-full`}
                  ></p>
                  <p>{item?.available ? 'Available' : 'Unavailable'}</p>
                </div>
                <p className="text-lg font-semibold">{item?.speciality}</p>
                <p className=" font-medium text-gray-700">{item?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;
