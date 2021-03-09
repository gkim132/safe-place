import { Data } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./LocationInfoBox.css";

const LocationInfoBox = ({
  selected,
  setSelected,
  detailedLocationInfo,
  loading,
}) => {
  const [loadingDate, setLoadingDate] = useState(false);
  const [localDate, setLocalDate] = useState();

  function calcTime(offset) {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const date = new Date(utc + 1000 * offset);
    date.getMinutes() < 30
      ? setLocalDate([date.getDay(), date.getHours(), date.getMinutes()])
      : setLocalDate([date.getDay(), date.getHours() + 1, date.getMinutes()]);
    // setLocalDate([date.getDay(), date.getHours(), date.getMinutes()]);
  }
  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingDate(false);
      const timestamp = Math.floor(Date.now() / 1000);

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${detailedLocationInfo.coordinates.lat},${detailedLocationInfo.coordinates.lng}&timestamp=${timestamp}&key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();
      await calcTime(data.rawOffset + data.dstOffset);
      await setLoadingDate(true);
    };

    fetchEvents();
  }, []);

  return selected && localDate ? (
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
          <div className="occupancy">
            Current Occupancy:{" "}
            <div className="occupancy__number">
              {console.log(localDate)}
              {detailedLocationInfo.populartimes ? (
                occupancyColor(
                  detailedLocationInfo.populartimes[localDate[0]].data[
                    localDate[1]
                  ]
                )
              ) : (
                <div className="unknown">Unknown</div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  ) : null;
};

export default LocationInfoBox;

const occupancyColor = (crowd) => {
  if (crowd > 66) {
    return <div className="red">{crowd}%</div>;
  } else if (crowd > 33) {
    return <div className="orange">{crowd}%</div>;
  } else {
    return <div className="green">{crowd}%</div>;
  }
};
