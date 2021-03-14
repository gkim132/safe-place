import React, { useState } from "react";
import "./SignIn.css";

const SignIn = ({
  setloadUser,
  setRoute,
  setIsSignedIn,
  detailedLocationInfo,
  loadUser,
}) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value);
  };

  const onSubmitSignIn = () => {
    // setloadUser((user) => {
    //   const userFavorites = user?.favorites || [];

    //   return {
    //     ...user,
    //     favorites: [...userFavorites],
    //   };
    // });
    console.log(loadUser);
    fetch("http://localhost:3030/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Sign In Response: ", data);
        if ((data !== "Wrong Credentials" && data.length > 0) || data.email) {
          console.log("Signnnnnnnnnnnnnnnnnnnnnnnnnnnn", data);
          console.log("Signnnnnnnnnnnnnnnnnnnnnnnnnnnn", loadUser);
          // setloadUser((state) => ({
          //   ...state,
          //   favorites: favorites.map((fav) => ({
          //     ...fav,
          //     coordinates: { lat: +fav.lat, lng: +fav.lng },
          //   })),
          // }));
          setloadUser(data);
          console.log("Signnnnn123123123nnn123nn", loadUser);
          setRoute("home");
          setIsSignedIn(true);
        }
      });
  };

  return (
    <article className="SignIn">
      <main>
        <div>
          <fieldset id="sign_up">
            <legend>Sign In</legend>
            <h5>Safe Place</h5>
            <div className="control">
              <input
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
                placeholder="Email"
              />
            </div>
            <div className="control">
              <input
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
                placeholder="Password"
              />
            </div>
            <div className="actionButtons">
              <div>
                <input
                  onClick={() => {
                    onSubmitSignIn();
                  }}
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div>
                <button onClick={() => setRoute("register")}>Register</button>
              </div>
            </div>
          </fieldset>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
