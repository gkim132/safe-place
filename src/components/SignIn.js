import React, { useState } from "react";
import "./SignIn.css";

const SignIn = ({ setloadUser, setRoute, setIsSignedIn, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isSignInSuccess, setIsSignInSuccess] = useState(true);

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("https://safe-place-nodejs-backend.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if ((data !== "Wrong Credentials" && data.length > 0) || data.email) {
          setloadUser(data);
          setRoute("home");
          setIsSignedIn(true);
        } else {
          setIsSignInSuccess(false);
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
            {!isSignInSuccess && (
              <div>
                <p>The email or password you entered is incorrect.</p>
              </div>
            )}
            <div className="actionButtons">
              <div>
                <button onClick={() => setRoute("register")}>Register</button>
              </div>
              <div>
                <input
                  onClick={() => {
                    onSubmitSignIn();
                  }}
                  type="submit"
                  value="Sign in"
                />
              </div>
            </div>
          </fieldset>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
