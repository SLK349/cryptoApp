import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../utils/Context";

import "./FormModal.css";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/constants";
import MessageModal from "../MessageModal/MessageModal";

export default function FormModal({ closeModal }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const userInfo = useContext(userContext);
  const [isError, setIsError] = useState(false);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  console.log(isModalOpen, modalMessage);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const data = { user: { username, mail, password } };
    console.log(data);
    axios
      .post(API_ENDPOINTS.CREATE_USER, data)
      .then((response) => {
        console.log(response);
        // closeModal(false);
        setModalMessage("Compte créé avec succès !");
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        setModalMessage("Erreur lors de la création du compte.");
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 5000);
      });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const data = { user: { username: loginUsername, password: loginPassword } };
    axios
      .post(API_ENDPOINTS.AUTH_USER, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        let content = { ...userInfo };
        content.isConnected = true;
        userInfo.setUserInfo(content);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      });
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const onAnimationEnd = () => {
    setIsError(false);
  };

  return (
    <div
      className="container-form"
      onClick={(e) => {
        closeModal(false);
      }}
    >
      <MessageModal isOpen={isModalOpen} content={modalMessage} />
      <div
        className={`wrapper ${isSignUp ? "animate-signUp" : "animate-signIn"} ${isError ? "error-shake" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="form-wrapper sign-up">
          <form onSubmit={handleFormSubmit}>
            <h2>Sign Up</h2>
            <div className="input-group">
              <input type="text" required onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="">Username</label>
            </div>
            <div className="input-group">
              <input type="email" required onChange={(e) => setMail(e.target.value)} />
              <label htmlFor="">Email</label>
            </div>
            <div className="input-group">
              <input type="password" required onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="">Password</label>
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <div className="sign-link">
              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  className="signIn-link"
                  onClick={(e) => {
                    setIsSignUp(false);
                    setIsSignUp(true);
                  }}
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="form-wrapper sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            <div className="input-group">
              <input type="text" required onChange={(e) => setLoginUsername(e.target.value)} />
              <label htmlFor="">Username</label>
            </div>
            <div className="input-group">
              <input type="password" required onChange={(e) => setLoginPassword(e.target.value)} />
              <label htmlFor="">Password</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>

            <div className="sign-link">
              <p>
                Don't have an account?{" "}
                <a
                  href="#"
                  className="signUp-link"
                  onClick={(e) => {
                    setIsSignUp(true);
                    setIsSignUp(false);
                  }}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
