import React, { useState } from "react";
import Map from "./components/Map";
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState("signIn");
  const [loadUser, setloadUser] = useState({
    id: "",
    name: "",
    email: "",
    joined: "",
    favorites: [],
  });

  return (
    <div>
      <Navigation
        setRoute={setRoute}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
      />

      {isSignedIn === true ? (
        <div>
          <Map loadUser={loadUser} setloadUser={setloadUser} />
        </div>
      ) : route === "signIn" || route === "signOut" ? (
        <SignIn
          setloadUser={setloadUser}
          setRoute={setRoute}
          setIsSignedIn={setIsSignedIn}
        />
      ) : (
        <Register
          setloadUser={setloadUser}
          setRoute={setRoute}
          setIsSignedIn={setIsSignedIn}
        />
      )}
    </div>
  );
}

export default App;
