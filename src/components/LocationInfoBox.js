import { Data } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./LocationInfoBox.css";

const LocationInfoBox = ({ selected, setSelected, detailedLocationInfo }) => {
  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  console.log("detailedLocationInfo: ", detailedLocationInfo);
  console.log("selected in locationBox :>> ", new Date());

  return selected ? (
    <div className="location__info">
      <div className="location__top">
        <div className="location__info__title">
          <h2>Location Info</h2>
        </div>
        <button
          className="btn"
          onClick={() => {
            setSelected("");
          }}
        >
          <i className="fa fa-close"></i>
        </button>
      </div>
      <ul>
        <li>
          Name: <strong>{detailedLocationInfo.name}</strong>
        </li>
        <br></br>
        <li>
          Address: <strong>{detailedLocationInfo.address}</strong>
        </li>
      </ul>
    </div>
  ) : null;
};

export default LocationInfoBox;
