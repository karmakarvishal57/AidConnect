import { useContext, useEffect } from "react";
import { Router, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import AllDoctors from "../components/AllDoctors";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDocs, setFilterDocs] = useState([]);
  const navigate = useNavigate();

  const applyFilters = () => {
    if (speciality) {
      setFilterDocs(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDocs(doctors);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [doctors, speciality]);

  return <AllDoctors props={{doctors,speciality,filterDocs,navigate,setFilterDocs}}></AllDoctors>
};

export default Doctors;
