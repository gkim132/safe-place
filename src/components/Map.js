import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import {
  Data,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import LocationInfoBox from "./LocationInfoBox";
import SearchBox from "./SearchBox";
import MyLocation from "./MyLocation";

const Map = ({ loadUser, setloadUser }) => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState();
  const [locationInfo, setLocationInfo] = useState();
  const [detailedLocationInfo, setDetailedLocationInfo] = useState();
  const [myLocationCoord, setMyLocationCoord] = useState([]);
  const [ismyLocationBtnClicked, setIsmyLocationBtnClicked] = useState(false);
  const [myCurrentLocationPin, setMyCurrentLocationPin] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (locationInfo) {
          const place_Id = locationInfo[0].placeId;
          const res = await fetch(`http://127.0.0.1:5000/placeId/${place_Id}`);
          const data = await res.json();

          const result = await JSON.parse(JSON.stringify(data));
          console.log(data);
          await setDetailedLocationInfo(result);
          setSelected(true);
        }
      } catch (err) {}
    };
    fetchEvent();
  }, [locationInfo]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const locationMarker = markers.map((marker, ind) => (
    <Marker
      key={ind}
      position={{ lat: marker.lat, lng: marker.lng }}
      onClick={() => {
        setSelected(true);
      }}
      icon={{
        url: `/red-marker.svg`,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 30),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
    />
  ));

  const onMapClick = useCallback((e) => {
    if (e.placeId) {
      setMarkers(() => [
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      ]);

      setSelected(() => true);
      setLocationInfo(() => [
        {
          name: "",
          coordinates: [e.latLng.lat(), e.latLng.lng()],
          placeId: e.placeId,
          time: new Date(),
        },
      ]);
      setMyLocationCoord([e.latLng.lat(), e.latLng.lng()]);
    }
  }, []);

  return isLoaded || loadError ? (
    <div>
      <SearchBox
        mapRef={mapRef}
        setMarkers={setMarkers}
        setLocationInfo={setLocationInfo}
        myLocationCoord={myLocationCoord}
        setMyLocationCoord={setMyLocationCoord}
      />
      <MyLocation
        mapRef={mapRef}
        setMyLocationCoord={setMyLocationCoord}
        setIsmyLocationBtnClicked={setIsmyLocationBtnClicked}
        setMyCurrentLocationPin={setMyCurrentLocationPin}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={options}
        clickableIcons={true}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {ismyLocationBtnClicked && myCurrentLocationPin && (
          <Marker
            // key={ind}
            position={{
              lat: Number(myCurrentLocationPin[0]),
              lng: Number(myCurrentLocationPin[1]),
            }}
            icon={{
              url: `/myLocationMarker.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 30),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}
        {locationMarker}
        {detailedLocationInfo && (
          <LocationInfoBox
            selected={selected}
            setSelected={setSelected}
            detailedLocationInfo={detailedLocationInfo}
            setloadUser={setloadUser}
            loadUser={loadUser}
          />
        )}
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
