import { useState, useEffect } from "react";
import "./LocationInfoBox.css";

const LocationInfoBox = ({ selected, info, setSelected }) => {
  const [displayButton, setDisplayButton] = useState("");
  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  console.log("++++++>>>>>>>>", selected);
  // const [displayButton, setDisplayButton] = useState(selected);
  //   console.log("selected :>> ", selected);
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
          Name: <strong>{info.name}</strong>
        </li>
        <br></br>
        <li>
          Address: <strong>{info.address}</strong>
        </li>
      </ul>
    </div>
  ) : null;
};

export default LocationInfoBox;
