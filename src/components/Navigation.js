import React from "react";

const Navigation = ({ setRoute, isSignedIn, setIsSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            setRoute("signIn");
            setIsSignedIn(false);
          }}
        >
          Sign Out
        </button>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            setRoute("signIn");
            setIsSignedIn(false);
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => {
            setRoute("register");
            setIsSignedIn(false);
          }}
        >
          Register
        </button>
      </nav>
    );
  }
};

export default Navigation;
