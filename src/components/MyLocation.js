import { useCallback } from "react";
import "./MyLocation.css";

function MyLocation({
  mapRef,
  setMyLocationCoord,
  setIsmyLocationBtnClicked,
  setMyCurrentLocationPin,
}) {
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
              panTo({
                lat: coordinates.coords.latitude,
                lng: coordinates.coords.longitude,
              });
              setMyCurrentLocationPin([
                coordinates.coords.latitude,
                coordinates.coords.longitude,
              ]);
              setMyLocationCoord([
                coordinates.coords.latitude,
                coordinates.coords.longitude,
              ]);
              setIsmyLocationBtnClicked(true);
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
