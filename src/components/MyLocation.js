import { useCallback } from "react";
import "./MyLocation.css";

function MyLocation({ mapRef, setMyLocationCoord }) {
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);
  return (
    <div className="container">
      <button
        className="mylocation"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (coordinates) => {
              console.log("coordinates", coordinates);
              panTo({
                lat: coordinates.coords.latitude,
                lng: coordinates.coords.longitude,
              });
              setMyLocationCoord([
                coordinates.coords.latitude,
                coordinates.coords.longitude,
              ]);
            },
            (error) => null
          );
        }}
      >
        <img src="/myLocation.svg" alt="myLocation" />
      </button>
    </div>
  );
}

export default MyLocation;
