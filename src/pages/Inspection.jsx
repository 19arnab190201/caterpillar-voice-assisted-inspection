import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}>
      <div className='w-[70vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 light:bg-gray-800 light:border-gray-700'>
        <form className='space-y-6'>
          <h5 className='text-xl font-medium text-gray-900 light:text-white'>
            Search for Machine
          </h5>
          <div>
            <label
              htmlFor='serialNumber'
              className='block mb-2 text-sm font-medium text-gray-900 light:text-white'>
              Enter Serial Number
            </label>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}>
              <input
                type='text'
                name='serialNumber'
                id='serialNumber'
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className='w-[90%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 light:bg-gray-600 light:border-gray-500 light:placeholder-gray-400 light:text-white'
                placeholder='Example - 7301234 , 73012EJ35'
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
        </form>

        {loading && (
          <div className='flex justify-center mt-4'>
            <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16'></div>
          </div>
        )}

        {error && <p className='text-red-500 mt-4'>{error}</p>}

        {machineData && (
          <div className='mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow'>
            <h5 className='text-lg font-bold text-gray-900 light:text-white'>
              Machine Details
            </h5>
            <p>
              <strong>Model:</strong> {machineData.model}
            </p>
            <p>
              <strong>Serial Number:</strong> {machineData.serialNumber}
            </p>
            <p>
              <strong>Owner:</strong> {machineData.owner.name} (
              {machineData.owner.email})
            </p>
            <p>
              <strong>Purchase Date:</strong>{" "}
              {new Date(machineData.purchaseDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Inspection Date:</strong>{" "}
              {new Date(machineData.lastInspectionDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {machineData.status}
            </p>
            <p>
              <strong>Location:</strong> Latitude:{" "}
              {machineData.location.latitude}, Longitude:{" "}
              {machineData.location.longitude}
            </p>
          </div>
        )}
        <br />
        {machineData && (
          <button
            onClick={() =>
              navigate("/createinspection", { state: { machineData } })
            }
            type='submit'
            className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800'>
            Create a New Inspetion
          </button>
        )}
      </div>
    </div>
  );
};

export default Inspection;
