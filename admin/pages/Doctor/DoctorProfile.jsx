import React, { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profile, setProfile, getDoctorProfile, backendURL } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateDoctorProfile = async () => {
    try {
      const updateData = {
        available: profile.available,
        fees: profile?.fees,
        address: profile?.address,
      };
      const { data } = await axios.put(
        backendURL + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(!isEdit);
        getDoctorProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken,getDoctorProfile]);

  return (
    <div className="m-5">
      <div className="flex flex-col gap-4 sm:max-w-xl">
        <div className=" w-[200px]">
          <img
            src={profile.image}
            alt=""
            className="bg-blue-400 rounded-lg "
          />
        </div>
        <div className="flex bg-white flex-col gap-2 px-5 py-5">
          <p className="text-2xl font-semibold ">{profile?.name}</p>
          <div className="text-sm font-semibold text-gray-600 flex items-center  gap-2">
            <p>
              {profile.degree}-{profile.speciality}
            </p>
            <button className="border-2 border-gray-400 rounded-full px-3 text-xs font-semibold">
              {profile.experience}
            </button>
          </div>
          <div className=" text-sm font-semibold ">
            <p>About : </p>
            <p className="text-[13px] text-gray-600 text-wrap">{profile?.about}</p>
          </div>
          <p className="text-sm  font-semibold">
            Appointment Fees :{" "}
            <span className="text-[13px] text-gray-600 font-semibold">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  value={profile?.fees}
                  className="border pl-1 rounded w-12"
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, fees: e.target.value }));
                  }}
                />
              ) : (
                profile.fees
              )}
            </span>
          </p>

          <div className=" text-sm font-semibold">
            <p>Address : </p>
            <p className="text-gray-600 text-[13px]">
              {isEdit ? (
                <input
                  className="border pl-1 rounded "
                  type="text"
                  value={profile?.address?.line1}
                  onChange={(e) => {
                    setProfile((prev) => ({
                      ...prev,
                      address: {
                        ...prev?.address,
                        line1: e.target.value,
                      },
                    }));
                  }}
                />
              ) : (
                profile.address?.line1
              )}
              <br />
              {isEdit ? (
                <input
                  className="border pl-1 rounded "
                  type="text"
                  value={profile?.address?.line2}
                  onChange={(e) => {
                    setProfile((prev) => ({
                      ...prev,
                      address: {
                        ...prev?.address,
                        line2: e.target.value,
                      },
                    }));
                  }}
                />
              ) : (
                profile.address?.line2
              )}
            </p>
          </div>
          <div className="text-xs font-semibold text-gray-600 flex gap-1">
            <input
              type="checkbox"
              checked={profile?.available}
              onChange={() => {
                isEdit &&
                  setProfile((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }));
              }}
            />
            <label htmlFor="">Available</label>
          </div>
          {!isEdit ? (
            <button
              className="border-2 border-gray-400 rounded-full text-xs font-semibold w-[70px]  px-4 text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </button>
          ) : (
            <button
              className="border-2 border-gray-400 rounded-full text-xs font-semibold w-[70px]  px-4 text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => updateDoctorProfile()}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
