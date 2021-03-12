import { useState, useEffect } from "react";
import "./LocationInfoBox.css";

const LocationInfoBox = ({
  selected,
  setSelected,
  detailedLocationInfo,
  setloadUser,
  loadUser,
  isLoading,
}) => {
  const [localDate, setLocalDate] = useState();

  useEffect(() => {
    const fetchEvents = async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${detailedLocationInfo.coordinates.lat},${detailedLocationInfo.coordinates.lng}&timestamp=${timestamp}&key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();
      calcTime(data.rawOffset + data.dstOffset);
    };

    fetchEvents();
  }, []);

  const handleSaveLocationclick = () => {
    setloadUser((user) => {
      console.log(user);
      return {
        ...user,
        favorites: [...user.favorites, detailedLocationInfo],
      };
    });

    fetch("http://localhost:3030/favorites", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        placeId: detailedLocationInfo.id,
        coordinates: detailedLocationInfo.coordinates,
        email: loadUser.email,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        setloadUser(user);
      });
  };

  function calcTime(offset) {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const date = new Date(utc + 1000 * offset);
    setLocalDate([date.getDay(), date.getHours(), date.getMinutes()]);
  }

  const occupancyColor = () => {
    const crowd =
      detailedLocationInfo.populartimes[localDate[0]].data[localDate[1]];
    if (crowd > 66) {
      return <div className="red">{crowd}%</div>;
    } else if (crowd > 33) {
      return <div className="orange">{crowd}%</div>;
    } else {
      return <div className="green">{crowd}%</div>;
    }
  };

  return selected && localDate ? (
    <div className="location__info">
      <div className="location__top">
        <div className="location__info__title">
          <h2>Location Info</h2>
        </div>
        <button
          className="btn"
          onClick={() => {
            setSelected(false);
          }}
        >
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div>
        {isLoading ? (
          <img className="spinner" src="/spinner.svg" alt="spinner-solid" />
        ) : (
          <div>
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
                    {detailedLocationInfo.populartimes ? (
                      occupancyColor()
                    ) : (
                      <div className="unknown">Unknown</div>
                    )}
                  </div>
                </div>
              </li>
            </ul>
            <div className="action">
              <button
                className="saveBtn"
                onClick={() => {
                  handleSaveLocationclick();
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default LocationInfoBox;

/** Popular time api respose */
// {
// address: "402 N Thornton Ave, Madison, WI 53703, USA"
// coordinates: {lat: 43.09204070000001, lng: -89.3671462}
// id: "ChIJ4S4bKH1TBogRoJs0IEFgQXk"
// international_phone_number: "+1 608-266-4711"
// name: "Tenney Park"
// populartimes: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// rating: 4.6
// rating_n: 547
// time_spent: (2) [60, 60]
// types: (4) ["park", "tourist_attraction", "point_of_interest", "establishment"]
// __proto__: Object
// }
