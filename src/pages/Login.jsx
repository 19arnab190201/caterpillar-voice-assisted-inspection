import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
const Login = () => {
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
    <div>
      <form className='max-w-sm mx-auto' onSubmit={loginNow}>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Your email
          </label>
          <input
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='name@flowbite.com'
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Your password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-start mb-5'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              type='checkbox'
              value=''
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
              required
            />
          </div>
          <label
            htmlFor='remember'
            className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Remember me
          </label>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
