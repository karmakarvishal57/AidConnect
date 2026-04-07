import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../src/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { backendURL, aToken } = useContext(AdminContext);

  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Missing");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);

      const { data } = await axios.post(
        backendURL + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      console.log(data);
      if (data?.success) {
        toast.success(data.message);

        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form action="" className="m-5 w-full" onSubmit={onSubmitHandler}>
      <p className="text-xl mb-3 font-medium">Add Doctor</p>
      <div className="py-8 px-8 bg-white border border-gray-200 rounded w-full sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex gap-3 items-center mb-4 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="uploadImage"
              className="w-30 rounded-full"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p>
            Upload Doctor <br /> Image
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
          <div className="lg:flex-1 flex flex-col gap-3 ">
            <div className=" flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                className="py-1 px-2 border-2 rounded border-gray-400"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                className="py-1 px-2 border-2 rounded border-gray-400"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                className="py-1 px-2 border-2 rounded border-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <p>Experience</p>
              <select
                name=""
                id=""
                className="py-1 px-2 border-2 rounded border-gray-400"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="* Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>
            <div className=" flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="number"
                placeholder="Fees"
                className="py-1 px-2 border-2 rounded border-gray-400"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
              />
            </div>
          </div>
          <div className="lg:flex-1 flex flex-col gap-3 ">
            <div className="flex flex-col gap-1">
              <p>Speciality</p>
              <select
                name=""
                id=""
                required
                className="py-1 px-2 border-2 rounded border-gray-400"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p>Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                className="py-1 px-2 border-2 rounded border-gray-400"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Address</p>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Address 1"
                  required
                  className="py-1 px-2 border-2 rounded border-gray-400"
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                />
                <input
                  type="text"
                  placeholder="Address 2"
                  required
                  className="py-1 px-2 border-2 rounded border-gray-400"
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 text-gray-600">
          <div>
            <p className="mb-4">About Doctor</p>
            <textarea
              name=""
              id=""
              placeholder="Write about doctor"
              rows={5}
              cols={15}
              className="py-1 px-2 border-2 rounded border-gray-400 w-full"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            ></textarea>
          </div>
          <button className="px-4 py-1  rounded-2xl bg-blue-500 text-white my-3 cursor-pointer">
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
