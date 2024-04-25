// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import Loader from "./Loader";

const Testai = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const [jsonEditorVisible, setJsonEditorVisible] = useState(false);
  const [editedJson, setEditedJson] = useState("");

  const fetchData = async () => {
    setLoadingGenerate(true);

    const genAI = new GoogleGenerativeAI(
      "AIzaSyBEaIEJVfxKe9hOHeD1MSnNsbZoODHqsg0"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `from the given ${longitude} longitude, ${latitude} latitude, and ${placeName} {
      const areaSchema = new mongoose.Schema({
        name: String,
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
        "http://localhost:8080/api/areas/",
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.mappls.com/advancedmaps/api/4579d7f113a70e14a8c0cb1b79860a45/map_sdk?layer=vector&v=3.0&callback=initMap1';
    script.defer = true;
    script.async = true;

    window.initMap1 = () => {
      // eslint-disable-next-line no-undef
      var map = new mappls.Map('map', { center: [28.638698386592438, 77.27604556863412] });

      map.addListener('polygoncomplete', (polygon) => {
        const coordinates = polygon.getPath().getArray();
      
        const center = coordinates.reduce((acc, curr) => {
          acc.lat += curr.lat();
          acc.lng += curr.lng();
          return acc;
        }, { lat: 0, lng: 0 });
        center.lat /= coordinates.length;
        center.lng /= coordinates.length;
      
        setLatitude(center.lat);
        setLongitude(center.lng);
      
        fetchData();
      });
      
      map.addListener('load', function () {
        var options = {
          fillColor: "red",
          lineGap: 10,
          strokeOpacity: 1.0
        }
        // eslint-disable-next-line no-undef
        mappls.draw({
          map: map,
          type: 'polygon',
          callback: draw_callback,
          options: options
        });
      });

      function draw_callback(data) {
        console.log(data);
        console.log(data.Scopes);
      }
    }

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.initMap1;
    };
  }, []);



  return (
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
      <div id="map" style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}></div>
    </div>
  );
};

export default Testai;
