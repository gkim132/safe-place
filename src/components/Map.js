import React, { useState, useEffect, useCallback, memo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import LocationInfoBox from "./LocationInfoBox";
// import SearchBox from "./SearchBox";

// import "./SearchBox.css";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const Map = () => {
  const [location, setLocation] = useState();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locationInfo, setLocationInfo] = useState("");

  // ChIJgUbEo8cfqokR5lP9_Wh_DaM
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (locationInfo.name) {
          console.log(locationInfo);
          const place_Id = locationInfo.name;
          const res = await fetch(`/placeId/${place_Id}`);
          const data = await res.json();
          console.log("pop:", data);
          setLocation(data);
        }
      } catch (err) {}
    };
    fetchEvent();
  }, [locationInfo]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  const locationMarker = markers.map((marker, ind) => (
    <Marker
      key={ind}
      position={{ lat: marker.lat, lng: marker.lng }}
      onClick={() => {
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
      setMarkers(() => [
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          placeId: e.placeId,
          time: new Date(),
        },
      ]);
      console.log("markers", markers);
      setSelected(true);
      // setLocationInfo({ name: marker.placeId, address: marker.lat });
    }
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  return isLoaded || loadError ? (
    <div>
      <SearchBox panTo={panTo} />
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
        onLoad={onMapLoad}
      >
        {locationMarker}
        {selected && (
          <LocationInfoBox
            selected={selected}
            info={locationInfo}
            setSelected={setSelected}
          />
        )}
      </GoogleMap>
    </div>
  ) : (
    "Loading"
  );
};

function SearchBox({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.073051, lng: () => -89.40123 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <div className="search__box">
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search"
            style={{
              borderRadius: 10,
              border: 0,
            }}
          />
          <button className="search__box__btn" onClick={() => {}}>
            <i className="fa fa-close"></i>
          </button>
        </div>
        <ComboboxPopover style={{ borderRadius: 10 }}>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

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
