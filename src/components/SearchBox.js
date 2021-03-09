import React, { useCallback } from "react";
import "./SearchBox.css";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

function SearchBox({ mapRef, setMarkers, setBasicbasicLocationInfo }) {
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
  const handleButton = () => {
    setValue("");
  };
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
      setMarkers([{ lat, lng }]);
      setBasicbasicLocationInfo([
        { coordinates: [lat, lng], placeId: results[0].place_id },
      ]);
    } catch (error) {}
  };

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

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
          <button className="search__box__btn" onClick={handleButton}>
            <i className="fa fa-close"></i>
          </button>
        </div>
        <ComboboxPopover style={{ borderRadius: 10 }}>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default SearchBox;
