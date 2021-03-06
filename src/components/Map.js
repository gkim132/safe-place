import React, { useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBpzqBpEXNNeLU9O2B5GGqWvspJSk7tfL8",
  });

  return isLoaded || loadError ? (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={options}
      ></GoogleMap>
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
