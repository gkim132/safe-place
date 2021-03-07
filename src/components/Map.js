import React, { useState, useEffect, useCallback, memo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import LocationInfoBox from "./LocationInfoBox";

const Map = () => {
  const [location, setLocation] = useState();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locationInfo, setLocationInfo] = useState();

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     const res = await fetch("/pop");
  //     const data = await res.json();
  //     console.log("pop:", data);
  //     setLocation(data);
  //   };
  //   fetchEvent();
  //   console.log("loaded location:", location);
  // }, []);

  const locationMarker = markers.map((marker, ind) => (
    <Marker
      key={ind}
      position={{ lat: marker.lat, lng: marker.lng }}
      onClick={(e) => {
        setSelected(marker);
        setLocationInfo({ name: marker.placeId, address: marker.lat });
      }}
      icon={{
        url: `/blue-marker.svg`,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 30),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
    />
  ));

  const onMapClick = useCallback((e) => {
    console.log("e", e);
    if (e.placeId) {
      setMarkers((current) => [
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          placeId: e.placeId,
          time: new Date(),
        },
      ]);
    }
  }, []);

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
        clickableIcons={true}
        // onClick={(e) => {
        //   console.log(e.placeId);
        //   console.log(e.latLng.lat(), e.latLng.lng());
        //   e.placeId ? { onMapClick } : null;
        // }}
        onClick={onMapClick}
      >
        {locationMarker}
      </GoogleMap>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
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
