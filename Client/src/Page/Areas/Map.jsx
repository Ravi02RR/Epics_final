import React, {useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";

const MapComponent = ({ onCoordinatesUpdate }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWJoaW1hbjAwMyIsImEiOiJjbHZ4cWZyankwODJmMmttZWMyZHo2Ym43In0.ToHrTEVGq-J5cvBIiYLokw";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [77.0844,23.2032],
      zoom: 12,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });

    map.addControl(draw);

    map.on("draw.create", updateArea);
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);

    function updateArea(e) {
      const data = draw.getAll();
      const answer = document.getElementById("calculated-area");

      if (data.features.length > 0) {
        const area = turf.area(data);
        const center = turf.centroid(data);
        const centerCoordinates = center.geometry.coordinates;
        console.log("Center coords : ",centerCoordinates);
        const roundedArea = Math.round(area * 100) / 100;
        answer.innerHTML = `<p><strong>${roundedArea}</strong></p><p>square meters</p>`;
        onCoordinatesUpdate(centerCoordinates[0], centerCoordinates[1]);
      } else {
        answer.innerHTML = "";
        // if (e.type !== "draw.delete")
        //   alert("Click the map to draw a polygon.");
      }
    }

    return () => {
      map.remove();
    };
  }, [onCoordinatesUpdate]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: "500px" }} />
      <div className="calculation-box">
        <p>Click the map to draw a polygon.</p>
        <div id="calculated-area" />
      </div>
      <style>
        {`
          .calculation-box {
            height: 105px;
            width: 150px;
            position: relative;
            bottom: 40px;
            left: 10px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 15px;
            text-align: center;
            bottom:480px
          }

          p {
            font-family: 'Open Sans';
            margin: 0;
            font-size: 13px;
          }
        `}
      </style>
    </div>
  );
};

export default MapComponent;