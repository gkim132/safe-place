import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import store from 'store2'

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        if (locationInfo) {
          const place_Id = locationInfo[0].placeId;

          // todo: check the store
          // todo: don't make the call if we have result in a store
          let data;
          // let data = store(`place_${place_id}`);

          if (!data) {
            const res = await fetch(
              `http://127.0.0.1:5000/placeId/${place_Id}`
            );
            data = await res.json();

            // todo: keep result in a store
            // store(`place_${place_id}`, {...data, _cacheTimestamp: Date.now() });
          }

          await setIsLoading(false);
          const result = JSON.parse(JSON.stringify(data));
          console.log("detailedLocationInfo", data);
          setDetailedLocationInfo(result);
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

  const userFavorites = loadUser?.favorites
    ? loadUser.favorites //.map((f) => f.coordinates)
    : [];

  const favoriteMarkers = userFavorites.map((fav, ind) => (
    <Marker
      key={`${ind}_${fav.coordinates.lat}_${fav.coordinates.lng}`}
      position={{ lat: fav.coordinates.lat, lng: fav.coordinates.lng }}
      onClick={() => {
        setLocationInfo([{ placeId: fav.placeId }]);
        setSelected(true);
        setMarkers([]);
      }}
      icon={{
        url: `/yellow-marker.svg`,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 30),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
    />
  ));

  const locationMarker = markers.map((marker, ind) => (
    <Marker
      key={`${ind}_${marker.lat}_${marker.lng}`}
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

  const selectedMarkerInfo = [...userFavorites, ...markers].find(
    (marker) => `${marker.lat}_${marker.lng}` === selected
  );

  console.log("markers:", userFavorites, markers);
  console.log("selectedMarkerInfo:", selectedMarkerInfo);

  const markerComponents = [...locationMarker, ...favoriteMarkers];

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
        {/* {favoriteMarker} */}
        {markerComponents}
        {detailedLocationInfo && (
          <LocationInfoBox
            selected={selected}
            setSelected={setSelected}
            detailedLocationInfo={detailedLocationInfo}
            isFavorite={
              userFavorites &&
              userFavorites.find(
                (fav) =>
                  fav.coordinates.lat ===
                    detailedLocationInfo.coordinates.lat &&
                  fav.coordinates.lng === detailedLocationInfo.coordinates.lng
              )
            }
            setloadUser={setloadUser}
            loadUser={loadUser}
            isLoading={isLoading}
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
