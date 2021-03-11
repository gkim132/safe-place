import React, { useState } from "react";
import Map from "./components/Map";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState("signIn");
  const [loadUser, setloadUser] = useState([]);
  return (
    <div>
      <Navigation
        setRoute={setRoute}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />

      {isSignedIn === true ? (
        <div>
          <Map />
        </div>
      ) : route === "signIn" || route === "signOut" ? (
        <SignIn
          setloadUser={setloadUser}
          setRoute={setRoute}
          setIsSignedIn={setIsSignedIn}
        />
      ) : (
        <Register setloadUser={setloadUser} setRoute={setRoute} />
      )}
    </div>
  );
}

export default App;
