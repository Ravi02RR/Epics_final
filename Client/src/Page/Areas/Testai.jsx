// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect,useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import Loader from "./Loader";
import MapComponent from "./Map";


const Testai = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const [jsonEditorVisible, setJsonEditorVisible] = useState(false);
  const [editedJson, setEditedJson] = useState("");

  useEffect(() => {
    // Fetch place name when component mounts
    fetchPlaceName();
  }, [longitude]); // Empty dependency array to run only once when the component mounts

  const fetchPlaceName = async () => {
    try {
      const apiUrl = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=pk.eyJ1IjoiYWJoaW1hbjAwMyIsImEiOiJjbHZ4cWZyankwODJmMmttZWMyZHo2Ym43In0.ToHrTEVGq-J5cvBIiYLokw`;
      const response = await axios.get(apiUrl);
      const fullAddress = response.data.features[0].properties.full_address;
      setPlaceName(fullAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const fetchData = async () => {
    // Call fetchPlaceName to update place name before generating content
    await fetchPlaceName();

    setLoadingGenerate(true);

    const genAI = new GoogleGenerativeAI(
      "AIzaSyBEaIEJVfxKe9hOHeD1MSnNsbZoODHqsg0"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `from the given ${longitude} longitude, ${latitude} latitude, and ${placeName} {
      const areaSchema = new mongoose.Schema({
        name: String,
        type: String,
        topographicInfo: String,
        demographicData: String,
        population: Number,
        ageRatio: {
          "0-14": {
            male: Number,
            female: Number,
          },
          "15-24": {
            male: Number,
            female: Number,
          },
          "25-54": {
            male: Number,
            female: Number,
          },
          "55+": {
            male: Number,
            female: Number,
          },
        },
        genderRatio: {
          male: Number,
          female: Number,
          other: Number,
        },
        marketTrend: String,
        location: {
          type: { type: String, default: "Point" },
          coordinates: [Number],
          address: String,
        }
      }); generate json data for this mongo model with real coordinate information also reaplce place name with real place name  `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();
      setGeneratedText(generatedText);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleConvertToJsonClick = () => {
    setLoadingConvert(true);
    setJsonEditorVisible(true);
    setEditedJson(generatedText);
    setLoadingConvert(false);
  };

  const handlePostButtonClick = async () => {
    setLoadingConvert(true);

    try {
      if (!editedJson) {
        console.error("Generated text is empty. Please generate data first.");
        return;
      }

      const response = await axios.post(
        "https://epics-final-i5eq-git-main-ravi02rrs-projects.vercel.app/api/areas/",
        JSON.parse(editedJson),
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Post response:", response);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {

      setLoadingConvert(false);

    }
  };

  const handleCoordinatesUpdate = (newLongitude, newLatitude) => {
    setLongitude(newLongitude);
    setLatitude(newLatitude);
  };

  // try {
  //   const response = await axios.get(apiUrl);
  //   const fullAddress = response.data.features[0].properties.full_address;
  //   setPlaceName(fullAddress); // Update the placeName state with the full address
  // } catch (error) {
  //   console.error("Error fetching address:", error);
  // }

  return (
    <div>
    <div className="container mx-auto p-4">
      <div className="bg-gray-200 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Data</h2>
        <div className="mb-4">
          <div className="text-xl mb-2">{loadingGenerate && <Loader />}{generatedText}</div>
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="p-2 border border-gray-300 rounded ml-2"
          />
          <input
            type="text"
            placeholder="Place Name"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            className="p-2 border border-gray-300 rounded ml-2"
          />
          <button
            onClick={fetchData}
            className={`p-2 bg-blue-500 text-white rounded ml-2 ${loadingGenerate ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loadingGenerate}
          >
            Generate Data
          </button>
          <button
            onClick={handleConvertToJsonClick}
            className={`p-2 bg-green-500 text-white rounded ml-2 ${loadingConvert ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loadingConvert}
          >
            Convert to JSON
          </button>
          {jsonEditorVisible && (
            <button
              onClick={() => setJsonEditorVisible(false)}
              className="p-2 bg-gray-500 text-white rounded ml-2"
            >
              Hide JSON Editor
            </button>
          )}
        </div>
        {jsonEditorVisible && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
            <textarea
              value={editedJson}
              onChange={(e) => setEditedJson(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={handlePostButtonClick}
              className={`mt-2 p-2 bg-purple-500 text-white rounded ${loadingConvert ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loadingConvert}
            >
              Post Data
            </button>
          </div>
        )}
      </div>

      <div id="map" style={{ width: '100%', height: '60vh', margin: 0, padding: 0 }}>
      <MapComponent onCoordinatesUpdate={handleCoordinatesUpdate}/>
      </div>
      
    </div>
    </div>
  );
};

export default Testai;







