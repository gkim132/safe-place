import "./LocationInfoBox.css";

const LocationInfoBox = ({ info }) => {
  return (
    <div className="location__info">
      <h2>Location Info</h2>
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
  );
};

export default LocationInfoBox;
