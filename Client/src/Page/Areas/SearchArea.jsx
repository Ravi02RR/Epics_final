// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const SearchArea = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://epics-final-i5eq.vercel.app/api/search?query=${searchQuery}`
      );
      const data = response.data;
      setRecommendations(data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleInputChange = async (value) => {
    try {
      if (value.trim() === "") {
        setSuggestions([]);
      } else {
        const response = await axios.get(
          `https://epics-final-i5eq.vercel.app/api/search-suggestions?query=${value}`
        );
        const data = response.data;
        setSuggestions(data);
      }
      setShowResults(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleVisit = (suggestion) => {
    navigate(`/area/${suggestion.id}`);
  };

  useEffect(() => {
    handleInputChange(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchAllAreas = async () => {
      try {
        const response = await axios.get(
          `https://epics-final-i5eq.vercel.app/api/areas`
        );
        const data = response.data;
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching all areas:", error);
      }
    };

    fetchAllAreas();
  }, []);

  return (
    <div className="h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">Explore Areas</h1>
        <div className="relative flex items-center justify-center mb-8">
          <input
            className="input input-bordered w-full md:max-w-lg py-2 pr-8 pl-12 rounded-full"
            type="text"
            placeholder="Search by area name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleInputChange(e.target.value);
            }}
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 hidden bg-yellow-500 text-white rounded-full p-2 focus:outline-none transition duration-300 ease-in-out hover:bg-yellow-600"
          >
            <FaSearch />
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="bg-base border border-red-200 shadow-md text-center">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100 flex gap-4 border-red-500 "
                onClick={() => handleVisit(suggestion)}
              >
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <span className="truncate">{suggestion.name}</span>
              </div>
            ))}
          </div>


        )}
        {(showResults || searchQuery.trim() === "") && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
            <ul className="space-y-2">
              {recommendations.map((recommendation) => (
                <li key={recommendation.id} className="bg-gray-100 rounded-md p-2">
                  <button
                    onClick={() => handleVisit(recommendation)}
                    className="text-blue-600 hover:underline"
                  >
                    {recommendation.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchArea;
