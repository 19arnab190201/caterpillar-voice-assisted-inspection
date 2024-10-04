import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReportPage.css";
import logo from "../assets/Logo.png";

import { useAuthContext } from "../hooks/useAuthContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import html2pdf from "html2pdf.js";
const ReportPage = () => {
  const [data, setData] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/inspection/getMyReports/${
            user.user._id
          }`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBdLd3VnC2kFwGKmkVB11ZNDtyIafwl4s0"
  );
  const [suggestion, setSuggestion] = useState({});
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  async function run(mydata) {
    const jsonString = JSON.stringify(mydata);

    prompt =
      jsonString +
      "\n As given data is there section wise have a suggestion coloumn in each parameter which will give one liner suggestion according to expected value and value. Do this for all the section do not leave any of them . Return a json data , NOTE - While returning json data you can leave other parameters just send the suggestion parameter NOTE- SEND ONLY JSON DATA NO OTHER THING OR EXPLAINATION REQUIRED, YOU CAN LEAVE OTHER PARAMETERS just TAKE 3-4 DATA NOT WHOLE AND JUST SEND PARAMETER NAME AND SUGGESTION if value has image base64 data send back empty sting only";

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Assuming response is a Response object or similar
    const responseBody = response.text(); // Convert response to JSON
    console.log(responseBody);

    const resultFinal = responseBody.slice(7, -3);
    const jsonObject = JSON.parse(resultFinal);
    //setSuggestion(jsonObject);
    console.log(jsonObject);

    generatePDF(mydata, jsonObject);
  }

  const generatePDF = async (data, jsonObject) => {
    console.log(data);
    console.log(jsonObject);
    // Create a div to hold the dynamic content
    const printDiv = document.createElement("div");

    // HTML content with dynamic data
    printDiv.innerHTML = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vehicle Inspection Report</title>
    <link rel="stylesheet" href="style.css">
</head>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0 auto;
        max-width: 1100px;
        border: 1px solid #000; /* Add border to the entire page */
        box-sizing: border-box;
        padding: 50px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .logo {
        width: 140px;
    }

    .header-info {
        text-align: right;
    }

    h1, h2 {
        color: #000;
        background-color: #FFC401;
        padding: 10px 10px;
        border-radius: 3px;
    }

    .info-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    .info-table th, .info-table td {
        border: 1px solid #000;
        padding: 10px;
        vertical-align: top;
    }

    ul {
        margin: 0;
        padding-left: 20px;
    }

    footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.9em;
        color: #666;
    }

    footer a {
        color: #0066cc;
        text-decoration: none;
    }
</style>
<body>

    <div class="header">
        <img src="https://logowik.com/content/uploads/images/cat1868.jpg" alt="Logo" class="logo">
        <div class="header-info">
            <p>Organisation: <b>Catterpiller</b></p>
            <p>Inspection ID: <b>${data.inspector._id}</b></p>
            <p>Inspection Name: <b>${data.inspector.name}</b></p>
        </div>
        <div class="header-info">
            <p>Inspection Employee ID: <b>${data.inspector._id.slice(
              0,
              6
            )}</b></p>
            <p>Location of Inspection: <b>Chennai</b></p>
            <p>Customer Name: <b>Customer 1</b></p>
            <p>Date & Time of Inspection: <b>${new Date(
              data.date
            ).toLocaleDateString()} ${new Date(
      data.date
    ).toLocaleTimeString()}</b></p>        </div>
    </div>

 <h1>Vehicle Inspection Report</h1>

    <h2>Tires</h2>
    <table class="info-table">
        <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Standard Value</th>
            <th>Suggestion</th>
        </tr>
        <tr>
            <td>Tire Pressure for Left Front</td>
            <td>32 PSI</td>
            <td>30-35 PSI</td>
            <td>In range</td>
        </tr>
        <tr>
            <td>Tire Pressure for Right Front</td>
            <td>32 PSI</td>
            <td>30-35 PSI</td>
            <td>In range</td>
        </tr>
        <tr>
            <td>Tire Condition for Left Front</td>
            <td>Good</td>
            <td>N/A</td>
            <td>Maintain regular checks</td>
        </tr>
        <tr>
            <td>Tire Condition for Right Front</td>
            <td>Good</td>
            <td>N/A</td>
            <td>Maintain regular checks</td>
        </tr>
        <tr>
            <td>Tire Pressure for Left Rear</td>
            <td>34 PSI</td>
            <td>30-35 PSI</td>
            <td>In range</td>
        </tr>
        <tr>
            <td>Tire Pressure for Right Rear</td>
            <td>34 PSI</td>
            <td>30-35 PSI</td>
            <td>In range</td>
        </tr>
        <tr>
            <td>Tire Condition for Left Rear</td>
            <td>Ok</td>
            <td>N/A</td>
            <td>Monitor wear closely</td>
        </tr>
        <tr>
            <td>Tire Condition for Right Rear</td>
            <td>Needs Replacement</td>
            <td>N/A</td>
            <td>Replace immediately</td>
        </tr>
        <tr>
            <td>Overall Tire Summary</td>
            <td colspan="3">Tires are in generally good condition. Right rear tire requires replacement due to wear.</td>
        </tr>
        <tr>
            <td>Attached Images</td>
            <td colspan="3"><img src="tire1.jpg" alt="Tire 1"> <img src="tire2.jpg" alt="Tire 2"></td>
        </tr>
    </table>

    <h2>Battery</h2>
    <table class="info-table">
        <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Standard Value</th>
            <th>Suggestion</th>
        </tr>
        <tr>
            <td>Battery Make</td>
            <td>CAT</td>
            <td>N/A</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Battery Replacement Date</td>
            <td>01/05/2023</td>
            <td>N/A</td>
            <td>Next replacement in 3 years</td>
        </tr>
        <tr>
            <td>Battery Voltage</td>
            <td>12V</td>
            <td>12V</td>
            <td>In range</td>
        </tr>
        <tr>
            <td>Battery Water Level</td>
            <td>Good</td>
            <td>N/A</td>
            <td>Check periodically</td>
        </tr>
        <tr>
            <td>Condition of Battery</td>
            <td>No damage</td>
            <td>N/A</td>
            <td>Maintain regular checks</td>
        </tr>
        <tr>
            <td>Any Leak / Rust in Battery</td>
            <td>No</td>
            <td>N/A</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Battery Overall Summary</td>
            <td colspan="3">Battery is in good condition with no visible leaks or rust.</td>
        </tr>
        <tr>
            <td>Attached Images</td>
            <td colspan="3"><img src="battery.jpg" alt="Battery"></td>
        </tr>
    </table>

    <h2>Exterior</h2>
    <table class="info-table">
        <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Standard Value</th>
            <th>Suggestion</th>
        </tr>
        <tr>
            <td>Rust, Dent or Damage to Exterior</td>
            <td>No</td>
            <td>N/A</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Oil Leak in Suspension</td>
            <td>No</td>
            <td>N/A</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Overall Summary</td>
            <td colspan="3">Exterior is in good condition with no rust, dents, or oil leaks detected.</td>
        </tr>
        <tr>
            <td>Attached Images</td>
            <td colspan="3"><img src="exterior.jpg" alt="Exterior"></td>
        </tr>
    </table>

    <h2>Brakes</h2>
    <table class="info-table">
        <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Standard Value</th>
            <th>Suggestion</th>
        </tr>
        <tr>
            <td>Brake Fluid Level</td>
            <td>Good</td>
            <td>N/A</td>
            <td>Check periodically</td>
        </tr>
        <tr>
            <td>Brake Condition for Front</td>
            <td>Good</td>
            <td>N/A</td>
            <td>Maintain regular checks</td>
        </tr>
        <tr>
            <td>Brake Condition for Rear</td>
            <td>Ok</td>
            <td>N/A</td>
            <td>Monitor wear closely</td>
        </tr>
        <tr>
            <td>Emergency Brake</td>
            <td>Good</td>
            <td>N/A</td>
            <td>Maintain regular checks</td>
        </tr>
        <tr>
            <td>Brake Overall Summary</td>
            <td colspan="3">Brakes are functioning well, with the rear brakes showing slight wear but still operational.</td>
        </tr>
        <tr>
            <td>Attached Images</td>
            <td colspan="3"><img src="brakes.jpg" alt="Brakes"></td>
        </tr>
    </table>

    <h2>Engine</h2>
    <table class="info-table">
        <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Standard Value</th>
            <th>Suggestion</th>
        </tr>
        <tr>
            <td>Rust, Dents or Damage in Engine</td>
            <td>No</td>
            <td>N/A</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Engine Oil Condition</td>
            <td>Good</td>
            <td>N/A</td>
            <td>Maintain regular checks</td>
        </tr>
        <tr>
            <td>Engine Oil Color</td>
            <td>Clean</td>
            <td>Golden</td>
            <td>In range</td>
        </tr>
        <tr>
            <td>Brake Fluid Condition</td>
            <td>Good</td>
            <td>N/A</td>
            <td>Maintain regular checks</td>
        </tr>
        <tr>
            <td>Brake Fluid Color</td>
            <td>Clean</td>
            <td>Golden</td>
            <td>In range</td>
        </tr>
        <tr>
            <td>Any Oil Leak in Engine</td>
            <td>No</td>
            <td>N/A</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Overall Summary</td>
            <td colspan="3">Engine is in good condition with clean oil and no visible damage or leaks.</td>
        </tr>
        <tr>
            <td>Attached Images</td>
            <td colspan="3"><img src="engine.jpg" alt="Engine"></td>
        </tr>
    </table>

    <h2>Voice of Customer</h2>
    <table class="info-table">
        <tr>
            <th>Parameter</th>
            <th>Value</th>
         
        </tr>
        <tr>
            <td>Any Feedback from Customer</td>
            <td>Customer is satisfied with the overall condition of the vehicle but requested a follow-up on the rear tire replacement.</td>
       
        </tr>
        <tr>
            <td>Attached Images</td>
            <td colspan="3"><img src="feedback.jpg" alt="Customer Feedback"></td>
        </tr>
    </table>



    <footer>
        <p>Copyrights &copy; Rubber DUCKIES</p>
        <p>created at ${Date.now().toString()}</p>
    </footer>

</body>
</html>
    `;

    // Append the div to the body
    document.body.appendChild(printDiv);

    try {
      // Generate PDF from the printDiv content
      html2pdf().from(printDiv).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Clean up
      document.body.removeChild(printDiv);
    }
  };

  return (
    <div className='report-page content'>
      <img
        style={{
          margin: "0 auto",
        }}
        src={logo}
        alt=''
      />{" "}
      <h1
        style={{
          textAlign: "center",
          color: "#ffc50c",
          fontSize: "2.2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}>
        My Reports
      </h1>
      <div className='report-list'>
        {data ? (
          <div>
            {data.map((item, index) => (
              <div key={item._id} className='report-card'>
                <div>
                  <h5>Report {index + 1}</h5>
                  <p>
                    {" "}
                    {new Date(item.date).toLocaleDateString()},{" "}
                    {new Date(item.date).toLocaleTimeString()}
                  </p>
                </div>

                <button className='view-button' onClick={() => run(item)}>
                  View Report
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
