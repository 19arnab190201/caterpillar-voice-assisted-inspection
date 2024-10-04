import React from "react";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import bodyImage from "../assets/hero.png";
import sideImage from "../assets/bul.png";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <header className='der'>
        <nav className='nbar'>
          <div>
            <img className='loigi' src={logo} alt='Logo' />
          </div>
          <button className='logitton' onClick={handleLoginClick}>
            LOGIN
          </button>
        </nav>
      </header>
      <body className='cont'>
        <div>
          <img src={bodyImage} alt='Body Background' className='bodimage' />
          <img src={sideImage} alt='Side Image' className='body-image-right' />
        </div>
        <button className='get-started-button'>
          <span
            className='buttext'
            onClick={() => {
              navigate("/login");
            }}>
            GET STARTED
          </span>
          <div className='arrocircle'>
            <span className='arro'>&#x1F86A;</span>
          </div>
        </button>
      </body>
    </>
  );
};

export default Home;
