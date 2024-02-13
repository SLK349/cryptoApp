import axios from "axios";
import { useState } from "react";
import { logout } from "../utils/authService";

const CreateAxiosResponseInterceptor = (setUserInfo, navigate, setShowReco) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(error.response.data);
      if (error.response.data === "INVALID_TOKEN" || error.response.data === "NO_TOKEN" || error.response.data === "EXPIRED_TOKEN") {
        console.error(error.response.data.code);
        logout(setUserInfo, navigate);
        setShowReco(true);
        return new Promise(() => {});
      }
      return Promise.reject(error);
    }
  );
};

export default CreateAxiosResponseInterceptor;
