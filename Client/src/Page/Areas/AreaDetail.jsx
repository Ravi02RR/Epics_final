// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AreaDetail() {
  const [result,setresult] = useState("");
  const [capital,setcapital] = useState(0);
  const [area, setArea] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchAreaDetail();
  }, [id]);

  const fetchAreaDetail = async () => {
    try {
      const response = await axios.get(`https://epics-final-i5eq.vercel.app/api/areas/${id}`);
      setArea(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching area detail:", error);
      setLoading(false);
    }
  };

  const handleCapitalChange = (event) => {
    setcapital(event.target.value);
  };

  const fetchfromfalsk = async ()=>{
    try {
      const stringToSend = area.name; 
  
      const formData = new FormData();
      formData.append('myString', stringToSend);
      formData.append('capital', capital);
  
      axios.post("http://127.0.0.1:5000/res", formData)
        .then((res) => {
          console.log(res);
          setresult(res.data.message); 
        })
        .catch((error) => {
          console.error(error);
        });
  
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Area Detail</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className=" p-4 rounded shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-bold w-1/4">Name:</td>
                  <td className="px-4 py-2">{area.name}</td>
                </tr>
                <tr>
                  <td className="font-bold">Topographic Info:</td>
                  <td className="px-4 py-2">{area.topographicInfo || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-bold">Demographic Data:</td>
                  <td className="px-4 py-2">{area.demographicData || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-bold">Population:</td>
                  <td className="px-4 py-2">{area.population || 0}</td>
                </tr>
                <tr>
                  <td className="font-bold">Market Trend:</td>
                  <td className="px-4 py-2">{area.marketTrend || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-bold">Age Ratios:</td>
                  <td className="px-4 py-2">
                    {area.ageRatio ? (
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">Age Group</th>
                            <th className="px-4 py-2">Male</th>
                            <th className="px-4 py-2">Female</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(area.ageRatio).map(([ageGroup, ratios]) => (
                            <tr key={ageGroup}>
                              <td className="border px-4 py-2">{ageGroup}</td>
                              <td className="border px-4 py-2">{ratios.male || 0}</td>
                              <td className="border px-4 py-2">{ratios.female || 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      "No age ratio data available"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Gender Ratio:</td>
                  <td className="px-4 py-2">
                    <table>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2">Male:</td>
                          <td className="px-4 py-2">{area.genderRatio?.male || 0}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Female:</td>
                          <td className="px-4 py-2">{area.genderRatio?.female || 0}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">Other:</td>
                          <td className="px-4 py-2">{area.genderRatio?.other || 0}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                  <div className="flask-res">
                      <div className="result">{result}</div>
                      <input className="capital" value={capital} onChange={handleCapitalChange}></input>
                      <button onClick={fetchfromfalsk} >Evaluate</button>
                  </div>


              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AreaDetail;
