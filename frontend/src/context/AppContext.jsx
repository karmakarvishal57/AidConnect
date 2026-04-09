import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$ ';

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : '',
  );
  const [userData, setUserData] = useState('');
  const [image, setImage] = useState('');

  async function getAllDoctors() {
    try {
      const { data } = await axios.get(backendURL + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctorsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const loadUserProfile = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/user/get-profile', {
        headers: { token },
      });
      if (data.userData) {
        setUserData(data.userData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      formData.append('name', userData?.name);
      formData.append('address', JSON.stringify(userData?.address));
      formData.append('dob', userData?.dob);
      formData.append('phone', userData?.phone);
      formData.append('email', userData?.email);
      formData.append('gender', userData?.gender);
      image && formData.append('image', image);

      const { data } = await axios.put(backendURL + '/api/user/update-profile', formData, {
        headers: { token },
      });
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getAllDoctors,
    currencySymbol,
    token,
    setToken,
    backendURL,
    loadUserProfile,
    userData,
    setUserData,
    updateProfile,
    image,
    setImage,
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  useEffect(() => {
    if (token) loadUserProfile();
  }, [token]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
