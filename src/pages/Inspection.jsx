import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cat.png";
import {
  FiTag,
  FiHash,
  FiUser,
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
  FiAlertCircle,
} from "react-icons/fi";

import "./Inspection.css";

const Inspection = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [machineData, setMachineData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMachineData(null);

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/machines/getmachinesbyserial/${serialNumber}`
      );
      console.log(response.data);
      setMachineData(response.data.data);
    } catch (err) {
      setError("Machine not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`machine-search-main`}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "20%",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <div className='overlay'></div>
      <div className='logo-container'>
        <img src={logo} alt='' />
      </div>
      <div className={`content ${machineData ? "search-move-up" : ""}`}>
        <h5 className='main-title'>Search for Machine</h5>
        <div
          className='w-[70vw] p-2 bg-white'
          style={{
            borderRadius: 16,
            marginTop: 10,
          }}>
          <div className='form-con'>
            <svg
              width='73'
              height='73'
              viewBox='0 0 73 73'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M47.1458 42.5833H44.7429L43.8913 41.7621C46.9754 38.1853 48.6703 33.6187 48.6667 28.8958C48.6667 24.9855 47.5071 21.1631 45.3347 17.9118C43.1622 14.6605 40.0745 12.1264 36.4618 10.63C32.8492 9.13357 28.8739 8.74204 25.0387 9.5049C21.2036 10.2678 17.6808 12.1508 14.9158 14.9158C12.1508 17.6808 10.2678 21.2036 9.5049 25.0387C8.74204 28.8739 9.13357 32.8492 10.63 36.4618C12.1264 40.0745 14.6605 43.1622 17.9118 45.3347C21.1631 47.5071 24.9855 48.6667 28.8958 48.6667C33.7929 48.6667 38.2946 46.8721 41.7621 43.8913L42.5833 44.7429V47.1458L57.7917 62.3238L62.3238 57.7917L47.1458 42.5833ZM28.8958 42.5833C21.3221 42.5833 15.2083 36.4696 15.2083 28.8958C15.2083 21.3221 21.3221 15.2083 28.8958 15.2083C36.4696 15.2083 42.5833 21.3221 42.5833 28.8958C42.5833 36.4696 36.4696 42.5833 28.8958 42.5833Z'
                fill='black'
              />
            </svg>

            <input
              type='text'
              name='serialNumber'
              id='serialNumber'
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className='w-[90%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 light:bg-gray-600 light:border-gray-500 light:placeholder-gray-400 light:text-white'
              placeholder='Enter Serial Number'
              required
            />
            <button
              onClick={(e) => handleSearch(e)}
              type='submit'
              className='w-[10%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800'>
              Search
            </button>
          </div>
        </div>
        <div>
          {loading && (
            <div className='flex justify-center mt-4'>
              <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16'></div>
            </div>
          )}

          {error && <p className='text-red-500 mt-4'>{error}</p>}

          <div
            className={`mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow result-swipe-up ${
              machineData ? "show" : ""
            }`}>
            {machineData && (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='flex items-center'>
                    <FiTag
                      style={{ color: "#FFC50C", marginRight: "10px" }}
                      size={24}
                    />
                    <p>
                      <strong>Model:</strong> {machineData.model}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <FiHash
                      style={{ color: "#FFC50C", marginRight: "10px" }}
                      size={24}
                    />
                    <p>
                      <strong>Serial Number:</strong> {machineData.serialNumber}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <FiUser
                      style={{ color: "#FFC50C", marginRight: "10px" }}
                      size={24}
                    />
                    <p>
                      <strong>Owner:</strong> {machineData.owner.name} (
                      {machineData.owner.email})
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <FiCalendar
                      style={{ color: "#FFC50C", marginRight: "10px" }}
                      size={24}
                    />
                    <p>
                      <strong>Purchase Date:</strong>{" "}
                      {new Date(machineData.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <FiCalendar
                      style={{ color: "#FFC50C", marginRight: "10px" }}
                      size={24}
                    />
                    <p>
                      <strong>Last Inspection Date:</strong>{" "}
                      {new Date(
                        machineData.lastInspectionDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <FiCheckCircle
                      style={{ color: "#FFC50C", marginRight: "10px" }}
                      size={24}
                    />
                    <p>
                      <strong>Status:</strong> {machineData.status}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <FiMapPin
                      style={{ color: "#FFC50C", marginRight: "10px" }}
                      size={24}
                    />
                    <p>
                      <strong>Location:</strong> Latitude:{" "}
                      {machineData.location.latitude}, Longitude:{" "}
                      {machineData.location.longitude}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <br />
          {machineData && (
            <button
              onClick={() =>
                navigate("/createinspection", { state: { machineData } })
              }
              type='submit'
              style={{
                backgroundColor: "#FFC50C",
                color: "#000",
                padding: "20px 30px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "18px",
              }}>
              Create a New Inspection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inspection;
