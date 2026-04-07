import React from "react";
import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currency = "$";

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    return today.getFullYear() - birthDate.getFullYear();
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateOfAppointment = (slotDate) => {
    let date = slotDate.split("_");
    return date[0] + " " + months[Number(date[1]) - 1] + " " + date[2];
  };
  const value = { calculateAge, dateOfAppointment, currency };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
