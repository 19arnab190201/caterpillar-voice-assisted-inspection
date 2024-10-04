import React, { useState } from "react";
import "./LoginPage.css"; // Make sure the path is correct
import logo from "../assets/cat.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const loginNow = async (e) => {
    e.preventDefault();
    console.log("Login Now");
    const url = `${import.meta.env.VITE_API_URL}/api/v1/login`;
    await axios
      .post(url, {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        toast.success("Authentication Successful");
        console.log("res", response.data);

        setTimeout(() => {
          dispatch({ type: "LOGIN", payload: response.data.user });
          const userData = {
            user: response.data.user,
            token: response.data.token,
          };
          console.log("userData", userData);
          localStorage.setItem("catInspection", JSON.stringify(userData));
          navigate("/dashboard");
        }, 1200);
      })
      .catch(function (error) {
        toast.error(error.response.data.message || "Authentication Failed");
        console.log(error);
      });
  };

  return (
    <>
      <header className='login-header'>
        <ToastContainer />
        <nav className='navbar'>
          <img src={logo} alt='Logo' className='login-logo' />
        </nav>
      </header>
      <div className='conta'>
        <div className='login-container'>
          <div className='login-form'>
            <h2 className='welcome-text'>WELCOME</h2>
            <form>
              <div className='input-group'>
                <input
                  id='email'
                  type='email'
                  placeholder='EMAIL'
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='input-group'>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder='PASSWORD'
                  id='password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className='icon'
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}></span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  loginNow(e);
                }}
                type='submit'
                className='login-button'>
                LOGIN
              </button>
            </form>
            <div className='login-options'>
              <a href='/forgot-password'>Forget Password?</a>
              <a href='/signup'>Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
