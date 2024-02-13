import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxiosResponseInterceptor from "../utils/axiosConfig";

export function logout(setUserInfo, navigate) {
  localStorage.removeItem("token");
  setUserInfo({ isConnected: false });
  navigate("/home");
}

const AxiosInterceptorSetup = ({ setUserInfo, setShowReco }) => {
  const navigate = useNavigate();

  useEffect(() => {
    createAxiosResponseInterceptor(setUserInfo, navigate, setShowReco);
  }, [setUserInfo, navigate, setShowReco]);

  return null;
};

export default AxiosInterceptorSetup;
