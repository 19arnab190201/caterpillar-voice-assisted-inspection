import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast, ToastContainer } from "react-toastify";
import Webcam from "react-webcam";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/Logo.png";
import "./CreateInspection.css";
import { useNavigate } from "react-router-dom";
import { Segmented } from "antd";
import { FaTimes } from "react-icons/fa"; // Import the cross icon from react-icons

const predefinedWords = ["Broken", "High", "Low", "Rust", "Crack", "Damage"];

const tabIcons = [
  {
    secName: "Tires",
    icon: (
      <svg
        width='105'
        height='91'
        viewBox='0 0 105 91'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          opacity='0.2'
          d='M66.784 79.4933H37.6335C26.0058 79.4933 16.5804 64.3537 16.5804 45.6933C16.5804 27.0329 26.0058 11.8933 37.6335 11.8933H66.784C55.1562 11.8933 45.7309 27.0329 45.7309 45.6933C45.7309 64.3537 55.1562 79.4933 66.784 79.4933ZM68.4034 31.61C64.8244 31.61 61.9256 37.9158 61.9256 45.6933C61.9256 53.4708 64.8244 59.7766 68.4034 59.7766C71.9825 59.7766 74.8813 53.4708 74.8813 45.6933C74.8813 37.9158 71.9825 31.61 68.4034 31.61Z'
          fill='black'
        />
        <path
          d='M60.8162 56.6994C63.1766 61.8258 66.5815 62.5933 68.4035 62.5933C70.2254 62.5933 73.6303 61.8258 75.9907 56.6994C77.3632 53.7138 78.1203 49.8057 78.1203 45.6933C78.1203 41.581 77.3632 37.6729 75.9907 34.6872C73.6303 29.5609 70.2254 28.7933 68.4035 28.7933C66.5815 28.7933 63.1766 29.5609 60.8162 34.6872C59.4437 37.6729 58.6866 41.581 58.6866 45.6933C58.6866 49.8057 59.4437 53.7138 60.8162 56.6994ZM68.4035 34.4971C69.4642 35.2224 71.6424 39.0742 71.6424 45.6933C71.6424 52.3125 69.4642 56.1643 68.4035 56.8896C67.3427 56.1643 65.1645 52.3125 65.1645 45.6933C65.1645 39.0742 67.3427 35.2224 68.4035 34.4971ZM94.3149 76.6767H79.9057C86.6711 70.2441 91.076 58.8859 91.076 45.6933C91.076 25.1598 80.4078 9.07666 66.784 9.07666H37.6335C24.0098 9.07666 13.3415 25.1598 13.3415 45.6933C13.3415 66.2268 24.0098 82.31 37.6335 82.31H94.3149C95.174 82.31 95.9978 82.0132 96.6052 81.485C97.2126 80.9568 97.5539 80.2403 97.5539 79.4933C97.5539 78.7463 97.2126 78.0299 96.6052 77.5016C95.9978 76.9734 95.174 76.6767 94.3149 76.6767ZM78.8247 23.1353C82.5455 29.1137 84.5981 37.1271 84.5981 45.6933C84.5981 54.2595 82.5455 62.2729 78.8247 68.2513C75.44 73.684 71.1646 76.6767 66.784 76.6767C62.4033 76.6767 58.1279 73.684 54.7432 68.2513C51.0225 62.2729 48.9698 54.2595 48.9698 45.6933C48.9698 37.1271 51.0225 29.1137 54.7432 23.1353C58.1279 17.7027 62.4033 14.71 66.784 14.71C71.1646 14.71 75.44 17.7027 78.8247 23.1353ZM19.8194 45.6933C19.8194 44.8131 19.8477 43.9329 19.8882 43.0738L32.7751 35.071L42.666 41.2148C42.5527 42.6795 42.492 44.1758 42.492 45.6933C42.482 49.65 42.8981 53.5989 43.7349 57.4881L34.6578 51.8548C34.1084 51.5135 33.4502 51.3301 32.7751 51.3301C32.1001 51.3301 31.4418 51.5135 30.8925 51.8548L21.281 57.8402C20.2922 53.8488 19.8021 49.7762 19.8194 45.6933ZM25.5928 23.1353C28.9775 17.7027 33.2529 14.71 37.6335 14.71H53.6622C48.8443 19.2871 45.2248 26.371 43.5406 34.8351L34.6578 29.3179C34.1084 28.9767 33.4502 28.7933 32.7751 28.7933C32.1001 28.7933 31.4418 28.9767 30.8925 29.3179L20.8275 35.5709C21.783 30.9058 23.3944 26.6808 25.5928 23.1353ZM25.5928 68.2513C24.661 66.741 23.8572 65.1736 23.1879 63.5616L32.7751 57.6043L46.5163 66.1388C48.3787 70.3638 50.8079 73.9621 53.6622 76.6767H37.6335C33.2529 76.6767 28.9775 73.684 25.5928 68.2513Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    secName: "Engine",
    icon: (
      <svg
        width='104'
        height='90'
        viewBox='0 0 104 90'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M30.3333 15V22.5H43.3333V30H30.3333L21.6667 37.5V48.75H13V37.5H4.33333V67.5H13V56.25H21.6667V67.5H34.6667L43.3333 75H78V60H86.6667V71.25H99.6667V33.75H86.6667V45H78V30H52V22.5H65V15H30.3333Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    secName: "Exterior",
    icon: (
      <svg
        width='104'
        height='90'
        viewBox='0 0 104 90'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M20.8203 12.375C20.6578 12.375 20.475 12.3925 20.3125 12.4136C14.0177 13.347 7.7025 25.4355 5.60625 29.8125H51.675L54.0922 25.6113C51.5734 22.0957 46.9219 16.7589 42.25 16.9839C39.1828 17.1246 33.3125 22.957 33.3125 22.957C33.3125 22.957 26.1219 12.3205 20.8203 12.375ZM60.45 21.7265L53.95 32.9765H37.7609L29.4937 49.6757C33.9625 50.2558 37.9031 52.2597 40.6656 55.125H58.4594C59.4344 54.1054 60.5516 53.2089 61.7906 52.4355L67.6 29.8125H77.5328L80.8438 21.7265H60.45ZM4.26562 32.9765V47.039L7.02203 47.6543L14.2939 32.9765H4.26562ZM18.263 32.9765L10.5909 48.4629L15.7828 49.6406L24.0297 32.9765H18.263ZM28.0109 32.9765L19.3537 50.4492L20.1053 50.625C21.8156 50.0273 23.6641 49.6406 25.5938 49.5351L33.7797 32.9765H28.0109ZM70.525 32.9765L66.0359 50.4668C67.9859 49.8515 70.1187 49.5 72.3125 49.5C80.4984 49.5 87.4656 54.2636 89.6594 60.75H99.7344V46.5996L90.2891 43.875L87.1406 32.9765H80.0922H70.525ZM74.1406 35.4375H83.4844L86.0234 44.2265H71.6016L73.7953 36.6328L74.1406 35.4375ZM26.8125 52.664C18.8256 52.664 12.3906 58.2363 12.3906 65.1445C12.3906 72.0527 18.8256 77.625 26.8125 77.625C34.7953 77.625 41.2344 72.0527 41.2344 65.1445C41.2344 58.2363 34.7953 52.664 26.8125 52.664ZM72.3125 52.664C64.3297 52.664 57.8906 58.2363 57.8906 65.1445C57.8906 72.0527 64.3297 77.625 72.3125 77.625C80.2953 77.625 86.7344 72.0527 86.7344 65.1445C86.7344 58.2363 80.2953 52.664 72.3125 52.664ZM7.18656 58.289L4.66781 69.1875H9.34984C8.94969 67.9043 8.73438 66.5332 8.73438 65.1445C8.73438 62.6836 9.39453 60.3632 10.5706 58.289H7.18656ZM43.0625 58.289C44.2203 60.3632 44.8906 62.6836 44.8906 65.1445C44.8906 66.5332 44.6672 67.9043 44.2812 69.1875H54.8438C54.4578 67.9043 54.2344 66.5332 54.2344 65.1445C54.2344 62.6836 54.9047 60.3632 56.0625 58.289H43.0625ZM26.8125 59.5195C28.5364 59.5195 30.1897 60.1121 31.4087 61.167C32.6277 62.2219 33.3125 63.6527 33.3125 65.1445C33.3125 66.6363 32.6277 68.0671 31.4087 69.122C30.1897 70.1769 28.5364 70.7695 26.8125 70.7695C25.0886 70.7695 23.4353 70.1769 22.2163 69.122C20.9973 68.0671 20.3125 66.6363 20.3125 65.1445C20.3125 63.6527 20.9973 62.2219 22.2163 61.167C23.4353 60.1121 25.0886 59.5195 26.8125 59.5195ZM72.3125 59.5195C74.0364 59.5195 75.6897 60.1121 76.9087 61.167C78.1277 62.2219 78.8125 63.6527 78.8125 65.1445C78.8125 66.6363 78.1277 68.0671 76.9087 69.122C75.6897 70.1769 74.0364 70.7695 72.3125 70.7695C70.5886 70.7695 68.9353 70.1769 67.7163 69.122C66.4973 68.0671 65.8125 66.6363 65.8125 65.1445C65.8125 63.6527 66.4973 62.2219 67.7163 61.167C68.9353 60.1121 70.5886 59.5195 72.3125 59.5195ZM90.3297 63.914C90.3703 64.3183 90.3906 64.7226 90.3906 65.1445C90.3906 67.0254 90.0047 68.8183 89.2938 70.5058L99.7344 66.8847V63.914H90.3297Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    secName: "Brakes",
    icon: (
      <svg
        width='104'
        height='90'
        viewBox='0 0 104 90'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M52 75C71.1468 75 86.6667 61.5694 86.6667 45C86.6667 28.4306 71.1468 15 52 15C32.8532 15 17.3333 28.4306 17.3333 45C17.3333 61.5694 32.8532 75 52 75Z'
          stroke='black'
          stroke-width='4'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M52 52.5C54.2985 52.5 56.5029 51.7098 58.1283 50.3033C59.7536 48.8968 60.6667 46.9891 60.6667 45C60.6667 43.0109 59.7536 41.1032 58.1283 39.6967C56.5029 38.2902 54.2985 37.5 52 37.5C49.7015 37.5 47.4971 38.2902 45.8717 39.6967C44.2464 41.1032 43.3333 43.0109 43.3333 45C43.3333 46.9891 44.2464 48.8968 45.8717 50.3033C47.4971 51.7098 49.7015 52.5 52 52.5ZM52 7.5C57.6906 7.5 63.3255 8.46997 68.5829 10.3545C73.8404 12.2391 78.6174 15.0013 82.6413 18.4835C86.6652 21.9657 89.8571 26.0997 92.0348 30.6494C94.2125 35.1991 95.3333 40.0754 95.3333 45H78.013C78.013 39.0296 75.2724 33.3038 70.394 29.0821C65.5156 24.8605 58.8991 22.4888 52 22.4888V7.5Z'
          fill='black'
          stroke='black'
          stroke-width='4'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
    ),
  },
  {
    secName: "Battery",
    icon: (
      <svg
        width='104'
        height='90'
        viewBox='0 0 104 90'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M86.6667 22.5H17.3333C12.5537 22.5 8.66667 25.8638 8.66667 30V67.5C8.66667 71.6363 12.5537 75 17.3333 75H86.6667C91.4463 75 95.3333 71.6363 95.3333 67.5V30C95.3333 25.8638 91.4463 22.5 86.6667 22.5ZM39 52.5H17.3333V45H39V52.5ZM86.6667 52.5H78V60H69.3333V52.5H60.6667V45H69.3333V37.5H78V45H86.6667V52.5ZM17.3333 11.25H34.6667V18.75H17.3333V11.25ZM69.3333 11.25H86.6667V18.75H69.3333V11.25Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    secName: "Customer",
    icon: (
      <svg
        width='104'
        height='90'
        viewBox='0 0 104 90'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M92.6998 66.9741C91.0163 65.5398 70.616 58.711 66.9142 57.4229C63.232 56.1573 61.763 52.6501 61.763 52.6501C61.763 52.6501 60.1055 53.4432 60.1055 51.2157C60.1055 48.9854 61.763 52.6501 63.4205 44.0495C63.4205 44.0495 68.0192 42.9329 67.106 33.6995H66.001C66.001 33.6995 68.7635 23.8276 66.001 20.4863C63.2287 17.1451 62.1432 14.9176 56.056 13.3201C49.9785 11.7254 52.1885 12.0432 47.775 12.2063C43.355 12.3666 39.676 14.4366 39.676 15.5476C39.676 15.5476 36.9135 15.7079 35.815 16.6641C34.71 17.6204 32.8705 22.0754 32.8705 23.1891C32.8705 24.3029 33.7902 31.7954 34.71 33.3816L33.6147 33.691C32.695 42.9273 37.2937 44.0466 37.2937 44.0466C38.9512 52.6473 40.6087 48.9826 40.6087 51.2129C40.6087 53.4404 38.9512 52.6473 38.9512 52.6473C38.9512 52.6473 37.479 56.1516 33.8 57.4201C30.121 58.6941 9.69799 65.5398 8.03724 66.9713C6.37974 68.4338 6.56499 75.1163 6.56499 75.1163H45.682L48.5355 65.3851L46.0005 63.1913L50.3652 59.4085L54.73 63.1885L52.195 65.3823L55.0485 75.1135H94.1655C94.1655 75.1135 94.3702 68.4254 92.6932 66.9657L92.6998 66.9741Z'
          fill='black'
        />
      </svg>
    ),
  },
];

const CreateInspection = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { state } = useLocation();
  const sectionsData = state.machineData.inspectionTemplate.sections;

  const handleHidePopup = () => {
    setShowReview(false);
  };

  if (!sectionsData) {
    return <div>No data available</div>;
  }

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentParameterIndex, setCurrentParameterIndex] = useState(0);
  const [showCapturePrompt, setShowCapturePrompt] = useState(false);
  const [parameterValues, setParameterValues] = useState({});
  const [speechStatus, setSpeechStatus] = useState("Ready");
  const [isListening, setIsListening] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const webcamRef = useRef(null);

  const currentSection = sectionsData[currentSectionIndex];
  const currentParameter = currentSection.parameters[currentParameterIndex];

  const handleNext = () => {
    if (currentParameterIndex < currentSection.parameters.length - 1) {
      setCurrentParameterIndex(currentParameterIndex + 1);
    } else if (currentSectionIndex < sectionsData.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentParameterIndex(0);
    }
    setShowCapturePrompt(false);
  };

  const handlePrevious = () => {
    if (currentParameterIndex > 0) {
      setCurrentParameterIndex(currentParameterIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentParameterIndex(
        sectionsData[currentSectionIndex - 1].parameters.length - 1
      );
    }
    setShowCapturePrompt(false);
  };

  const handleSwitchSection = (index) => {
    setCurrentSectionIndex(index);
    setCurrentParameterIndex(0);
  };

  const handleChange = (event) => {
    const value = event.target.value;

    setParameterValues((prevValues) => ({
      ...prevValues,
      [currentParameter.parameterName]: value,
    }));

    const containsPredefinedWord = predefinedWords.some((word) =>
      value.includes(word)
    );

    const isBooleanYes =
      currentParameter.parameterType === "Boolean" && value === "yes";

    setShowCapturePrompt(containsPredefinedWord || isBooleanYes);
  };

  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setParameterValues((prevValues) => ({
      ...prevValues,
      [`${currentParameter.parameterName}`]: imageSrc,
    }));
    setShowWebcam(false);
  };

  const handleFinish = () => {
    setShowReview(true);
  };
  const updateBackend = async (inspectionData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/inspection/`,
        inspectionData
      );
      toast.success("Inspection submitted successfully!");
      await delay(2000); // Wait for 3 seconds to allow the toast message to show
      console.log(response.data);
      navigate("/reports");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while submitting the inspection.");
    }
  };

  // Add the delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted", parameterValues);

    //add all the data to sectionData and send it to the backend
    sectionsData.forEach((section) => {
      section.parameters.forEach((parameter) => {
        if (parameterValues[parameter.parameterName]) {
          parameter.value = parameterValues[parameter.parameterName];
        }
      });
    });

    //Create inspection object

    const inspectionData = {
      machine: state.machineData._id,
      inspector: user.user._id,
      date: new Date(),
      sections: sectionsData,
    };

    console.log(user.user._id);
    console.log(inspectionData);

    //Send inspectionData to the backend
    updateBackend(inspectionData);

    console.log("Updated sectionsData", sectionsData);

    setShowReview(false);
  };

  const handleReset = () => {
    setParameterValues({});
    setCurrentSectionIndex(0);
    setCurrentParameterIndex(0);
    setShowReview(false);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setSpeechStatus("Listening...");
    };

    recognition.onend = () => {
      setSpeechStatus("Ready");
    };

    recognition.onresult = (event) => {
      let spokenAnswer =
        event.results[event.results.length - 1][0].transcript.trim();
        if (spokenAnswer.endsWith('.')) {
          spokenAnswer = spokenAnswer.slice(0, -1);
      }
      
      console.log("I am", spokenAnswer);

      if (
        spokenAnswer.includes("yas") ||
        spokenAnswer.includes("yas yas") ||
        spokenAnswer.includes("yes") ||
        spokenAnswer.includes("Yes") ||
        spokenAnswer.includes("yes yes") ||
        spokenAnswer.includes("Yes Yes") ||
        spokenAnswer.includes("Yes yes")
      ) {
        setShowCapturePrompt(true);
        setParameterValues((prevValues) => ({
          ...prevValues,
          [currentParameter.parameterName]: "yes",
        }));
      } else if (
        ["next", "go next", "ahead", "forward"].some((command) =>
          spokenAnswer.toLowerCase().includes(command)
        )
      ) {
        handleNext();
      } else if (
        ["back", "previous", "revert", "last"].some((command) =>
          spokenAnswer.toLowerCase().includes(command)
        )
      ) {
        handlePrevious();
      } else if (spokenAnswer === "reset") {
        setParameterValues((prevValues) => ({
          ...prevValues,
          [currentParameter.parameterName]: "",
        }));
      } else {
        setParameterValues((prevValues) => ({
          ...prevValues,
          [currentParameter.parameterName]: spokenAnswer,
        }));
      }
    };

    recognition.onerror = (event) => {
      setSpeechStatus(`Error: ${event.error}`);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, handleNext, handlePrevious]);

  useEffect(() => {
    console.log("Parameter values updated", parameterValues);
  }, [parameterValues]);

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4'>
      <ToastContainer />

      <img src={logo} alt='' />
      {/* {console.log(sectionsData.map((section, index) => section.sectionName))} */}
      <Segmented
        size='large'
        options={sectionsData.map((section, index) => ({
          label: (
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {tabIcons[index].icon}
              <strong
                style={{
                  textTransform: "Uppercase",
                }}>
                {section.sectionName}
              </strong>
            </div>
          ),
          value: section._id,
          key: section._id, // Ensure each child has a unique key
        }))}
        defaultValue={sectionsData.length > 0 ? sectionsData[0]._id : null} // Ensure the first item is selected
        value={sectionsData[currentSectionIndex]._id}
        onChange={(value) => {
          handleSwitchSection(
            sectionsData.findIndex((section) => section._id === value)
          );
        }}
      />
      {/* 
      <div className='mt-6'>
        <h3 className='text-lg font-medium mb-2'>Switch Section</h3>
        <div className='flex space-x-2'>
          {sectionsData.map((section, index) => (
            <div
              key={section._id}
              onClick={() => handleSwitchSection(index)}
              className={`cursor-pointer px-4 py-2 rounded-md transition-all ${
                index === currentSectionIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
              {section.sectionName}
            </div>
          ))}
        </div>
      </div> */}
      <br />
      <br />
      <div
        className='w-[59%] bg-white shadow-md rounded-lg p-3 mb-4'
        style={{
          backgroundColor: "#D9D9D9",
          padding: "20px 30px",
          borderRadius: "20px",
        }}>
        <label
          className='block text-lg font-medium mb-2'
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px",
            textTransform: "uppercase",
          }}>
          {currentParameter.parameterName}
        </label>
        {currentParameter.parameterType === "Text" && (
          <>
            <input
              type='text'
              value={parameterValues[currentParameter.parameterName] || ""}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            <div className='text-sm text-gray-500 mt-1'>
              Expected value: {currentParameter.expectedValue}
            </div>
          </>
        )}
        {currentParameter.parameterType === "Number" && (
          <>
            <input
              type='number'
              value={parameterValues[currentParameter.parameterName] || ""}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            <div className='text-sm text-gray-500 mt-1'>
              Expected value: {currentParameter.expectedValue}
            </div>
          </>
        )}
        {currentParameter.parameterType === "Boolean" && (
          <>
            <select
              value={parameterValues[currentParameter.parameterName] || ""}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'>
              <option value=''>Select</option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
            <div className='text-sm text-gray-500 mt-1'>Select Yes or No</div>
          </>
        )}
      </div>
      {showCapturePrompt && (
        <div className='w-full max-w-md bg-yellow-100 shadow-md rounded-lg p-6 mb-4'>
          <p className='text-lg font-medium text-yellow-700'>
            Please capture images of the specific part.
          </p>
          <button
            onClick={() => setShowWebcam(true)}
            className='mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'>
            Capture Image
          </button>
        </div>
      )}
      {showWebcam && (
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-4'>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            className='w-full'
          />
          <button
            onClick={handleCaptureImage}
            className='mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
            Capture
          </button>
        </div>
      )}
      <div className='flex space-x-4'>
        <button
          style={{
            backgroundColor: "#3A3A3A",
            padding: "10px 20px",
            borderRadius: "10px",
            color: "#F4C300",
            fontSize: "22px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
          onClick={handlePrevious}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300'
          disabled={currentSectionIndex === 0 && currentParameterIndex === 0}>
          Previous
        </button>

        {currentSectionIndex === sectionsData.length - 1 &&
        currentParameterIndex === currentSection.parameters.length - 1 ? (
          <button
            onClick={handleFinish}
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            style={{
              backgroundColor: "#F4C300",
              padding: "10px 20px",
              borderRadius: "10px",
              color: "#2f2f2f",
              fontSize: "22px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}>
            Finish & Review
          </button>
        ) : (
          <button
            onClick={handleNext}
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            style={{
              backgroundColor: "#F4C300",
              padding: "10px 20px",
              borderRadius: "10px",
              color: "#2f2f2f",
              fontSize: "22px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}>
            Next
          </button>
        )}
      </div>

      <div className='mt-4 text-sm text-gray-500'>
        Speech Status: {speechStatus}
      </div>
      <button
        onClick={() => setIsListening(!isListening)}
        className='mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
        {isListening ? "Pause Speech Recognition" : "Start Speech Recognition"}
      </button>
      {showReview && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div
            className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg scrollable-popup transition-transform transform duration-300'
            style={{ maxHeight: "85vh", overflowY: "auto" }}>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-extrabold text-gray-800 border-b pb-4'>
                Review Your Answers
              </h2>
              <button
                onClick={handleHidePopup}
                className='text-gray-600 hover:text-gray-800'>
                <FaTimes size={24} />
              </button>
            </div>
            <div className='space-y-6'>
              {Object.entries(parameterValues).map(([key, value]) => (
                <div key={key} className='border-b pb-4'>
                  <p className='font-semibold text-gray-700'>{key}:</p>
                  {value.startsWith("data") ? (
                    <img
                      src={`${value}`}
                      alt={key}
                      className='w-full mt-2 rounded-md shadow-sm'
                    />
                  ) : (
                    <p className='text-gray-600'>{value}</p>
                  )}
                </div>
              ))}
            </div>
            <div className='mt-6 flex justify-end space-x-4'>
              <button
                onClick={handleSubmit}
                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md'>
                Submit
              </button>
              <button
                onClick={handleReset}
                className='px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md'>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInspection;
