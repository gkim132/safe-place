import { Data } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./LocationInfoBox.css";
import moment from "moment";

const LocationInfoBox = ({ selected, setSelected, detailedLocationInfo }) => {
  //   useEffect(() => {
  //     setSelected(selected);
  //   }, []);
  function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 1000 * offset);

    console.log("The local time is ", nd.toLocaleString());
  }
  useEffect(() => {
    const fetchEvents = async () => {
      //   setSelected(selected);

      console.log("test: >>>>>>>>>>>>>>>>>>>>>>>>");
      const timestamp = Math.floor(Date.now() / 1000);

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${detailedLocationInfo.coordinates.lat},${detailedLocationInfo.coordinates.lng}&timestamp=${timestamp}&key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();
      await console.log(data);
      await calcTime(data.rawOffset + data.dstOffset);
    };

    fetchEvents();
  }, [detailedLocationInfo]);

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

        <br></br>
        <li>
          {/* Occupancy: <strong>{detailedLocationInfo.populartimes}</strong> */}
        </li>
      </ul>
    </div>
  ) : null;
};

export default LocationInfoBox;
