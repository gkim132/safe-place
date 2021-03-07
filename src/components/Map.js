import React, { useState, useEffect, useCallback, memo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const sampleCoordinates = [
  { lat: 43.076599655501866, lng: -89.41248893737793 },
  { lat: 43.06496001609586, lng: -89.41759435083787 },
  { lat: 43.07473447236347, lng: -89.38405752182007 },
  { lat: 43.070216176323775, lng: -89.3565864905864 },
  { lat: 43.09208318533129, lng: -89.36725616455078 },
];

const Map = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch("/location");
      const data = await res.json();

      setLocation(data);
    };
    fetchEvent();
    console.log("loaded location:", location);
  }, []);

  const markers = sampleCoordinates.map((val, ind) => {
    return <Marker key={ind} position={val} />;
  });

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  return isLoaded || loadError ? (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={options}
        onClick={(e) => {
          console.log(e.latLng.lat(), e.latLng.lng());
        }}
      >
        {markers}
      </GoogleMap>
    </div>
  ) : (
    "Loading"
  );
};

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const center = {
  lat: 43.073051,
  lng: -89.40123,
};

const zoom = 12;

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default memo(Map);
