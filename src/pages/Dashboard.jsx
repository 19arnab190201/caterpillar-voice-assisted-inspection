import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
import loggg from "../assets/loggg.png";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  // State to track the active button
  const [activeButton, setActiveButton] = useState("Home");

  // Function to handle button click and set the active button
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <div className='container'>
        <div className='sidebar'>
          <div className='logo'>
            <img src={loggg} alt='error' />
          </div>
          <div className='sections'>
            <button
              className={`but ${activeButton === "Home" ? "active" : ""}`}
              onClick={() => handleButtonClick("Home")}>
              Home
            </button>
            <button
              className={`but ${activeButton === "Review" ? "active" : ""}`}
              onClick={() => handleButtonClick("Review")}>
              Review
            </button>
            <button
              className={`but ${
                activeButton === "Help & Support" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Help & Support")}>
              Help & Support
            </button>
            <button
              className={`but ${activeButton === "Analytics" ? "active" : ""}`}
              onClick={() => handleButtonClick("Analytics")}>
              Analytics
            </button>
          </div>
        </div>
        <div className='dash'>
          <div className='above'>
            <div className='nav'>
              <h1>Welcome</h1>
              <div className='pic'>
                <img
                  src='https://avatar.iran.liara.run/public/boy?username=Ash'
                  alt='error'
                />
              </div>
            </div>
            <div className='top'>
              <h1
                style={{
                  fontSize: "50px",
                }}>
                DASHBOARD
              </h1>
              <button
                style={{
                  color: "#2f2f2f",
                  fontWeight: "bold",
                }}
                className='reviewbtn'
                onClick={() => {
                  navigate("/addinspection");
                  console.log("START INSPECTION");
                }}>
                START INSPECTION
              </button>
            </div>
          </div>
          <div className='bottom'>
            <div className='left'>
              <div className='up'>
                <div className='l'></div>
                <div className='r'></div>
              </div>
              <div className='ro'>
                <h1>RECENT ORDERS</h1>
              </div>
              <div className='down'></div>
            </div>
            <div className='right'>
              <div className='updates'>
                <h1>UPDATES</h1>
              </div>
              <div className='updatesbg'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
