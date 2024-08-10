import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast, ToastContainer } from "react-toastify";
import Webcam from "react-webcam";
import axios from "axios";

const predefinedWords = ["Broken", "High", "Low", "Rust", "Crack", "Damage"];

const CreateInspection = () => {
  const { user } = useAuthContext();
  const { state } = useLocation();
  const sectionsData = state.machineData.inspectionTemplate.sections;

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
      await delay(3000); // Wait for 3 seconds to allow the toast message to show
      console.log(response.data);
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
      const spokenAnswer =
        event.results[event.results.length - 1][0].transcript.trim();
      console.log("I am", spokenAnswer);

      if (
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

        if (spokenAnswer.includes("yes")) {
          setShowCapturePrompt(true);
        }
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <ToastContainer />
      <h2 className='text-xl font-bold mb-4'>{currentSection.sectionName}</h2>

      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-4'>
        <label className='block text-lg font-medium mb-2'>
          {currentParameter.parameterName}:
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
          onClick={handlePrevious}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300'
          disabled={currentSectionIndex === 0 && currentParameterIndex === 0}>
          Previous
        </button>

        {currentSectionIndex === sectionsData.length - 1 &&
        currentParameterIndex === currentSection.parameters.length - 1 ? (
          <button
            onClick={handleFinish}
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
            Finish & Review
          </button>
        ) : (
          <button
            onClick={handleNext}
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
            Next
          </button>
        )}
      </div>

      <div className='mt-6'>
        <h3 className='text-lg font-medium mb-2'>Switch Section</h3>
        <div className='flex space-x-2'>
          {sectionsData.map((section, index) => (
            <button
              key={section._id}
              onClick={() => handleSwitchSection(index)}
              className={`px-4 py-2 rounded-md ${
                index === currentSectionIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}>
              {section.sectionName}
            </button>
          ))}
        </div>
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
            className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg scrollable-popup'
            style={{ maxHeight: "85vh", overflowY: "auto" }}>
            <h2 className='text-xl font-bold mb-4'>Review Your Answers</h2>
            <div className='space-y-4'>
              {Object.entries(parameterValues).map(([key, value]) => (
                <div key={key} className='border-b pb-2'>
                  <p className='font-medium'>{key}:</p>
                  {key.endsWith("_image") ? (
                    <img src={value} alt={key} className='w-full mt-2' />
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              ))}
            </div>
            <div className='mt-4 flex space-x-4'>
              <button
                onClick={handleSubmit}
                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                Submit
              </button>
              <button
                onClick={handleReset}
                className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'>
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
