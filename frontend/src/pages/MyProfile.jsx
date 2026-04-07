import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { userData, setUserData, updateProfile, image, setImage } =
    useContext(AppContext);

  return (
    <div className="max-w-[360px]">
      <div className="mt-4 max-w-[50%]">
        {isEdit ? (
          <label htmlFor="image">
            <div className=" relative cursor-pointer ">
              <img
                className={`rounded-full w-40 ${image ? "" : "opacity-70"}`}
                src={image ? URL.createObjectURL(image) : userData?.image}
                alt=""
              />
              <img
                className="absolute top-12 right-16 w-[40%]"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              type="file"
              hidden
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img src={userData?.image} className="rounded-full w-40" />
        )}
      </div>
      <div className="my-1 ">
        {isEdit ? (
          <input
            className="bg-zinc-100 pl-2 text-gray-700 text-2xl font-medium rounded-md"
            value={userData?.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        ) : (
          <p className="text-gray-700 text-2xl font-medium">{userData?.name}</p>
        )}
      </div>
      <hr className="my-2 border-none h-[1px] bg-gray-400" />
      <div>
        <p className="text-lg text-gray-400 font-medium">Contact Info</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-gray-400 mt-2">
          <p className="font-medium"> Email : </p>
          {isEdit ? (
            <input
              className="bg-zinc-100 rounded-md pl-2"
              type="email"
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          ) : (
            <p className="text-blue-300">{userData?.email}</p>
          )}

          <p className="font-medium"> Phone :</p>
          {isEdit ? (
            <input
              className="bg-zinc-100 rounded-md pl-2"
              value={userData?.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          ) : (
            <p className="text-blue-300">{userData?.phone}</p>
          )}
          <p className="font-medium"> Address:</p>

          {isEdit ? (
            <div>
              <input
                className="bg-zinc-100 w-full block rounded-md pl-2"
                value={userData?.address?.line1}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, line1: e.target.value },
                  })
                }
              />
              <input
                className="bg-zinc-100 w-full rounded-md pl-2"
                value={userData?.address?.line2}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, line2: e.target.value },
                  })
                }
              />
            </div>
          ) : (
            <p>
              {userData?.address?.line1}
              <br />
              {userData?.address?.line2}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 text-gray-400">
        <p className="text-lg font-medium">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-2">
          <p className="font-medium">Gender :</p>
          <select
            name="Gender"
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
            value={userData?.gender}
            className="w-20 "
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p className="font-medium">Dob :</p>
          {isEdit ? (
            <input
              type="date"
              className="bg-zinc-100 w-30 rounded-md pl-2"
              value={userData?.dob}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
            />
          ) : (
            <p>{userData?.dob}</p>
          )}
        </div>
      </div>
      <div className="gap-3 flex mt-4">
       { (!isEdit)?
        <button
          className="px-6 py-2 bg-zinc-100 rounded-full text-neutral-800 cursor-pointer"
          onClick={() => setIsEdit(true)}
        >
          Edit Info
        </button>:
        <button
          className="px-6 py-2 bg-zinc-100 rounded-full text-neutral-800 cursor-pointer hover:bg-blue-400 hover:text-white duration-200"
          onClick={() => {
            setIsEdit(false), updateProfile();
          }}
        >
          Save Info
        </button>
}
      </div>
    </div>
  );
};

export default MyProfile;
