import React, { useState } from "react";

const SignIn = ({ setloadUser, setRoute, setIsSignedIn }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (e) => {
    setSignInEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setSignInPassword(e.target.value);
  };

  const onSubmitSignIn = () => {
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
        if (data.id) {
          setloadUser(data);
          setRoute("home");
          setIsSignedIn(true);
        }
      });
  };

  return (
    <article>
      <main>
        <div>
          <fieldset id="sign_up">
            <legend>Sign In</legend>
            <div>
              <label htmlFor="email-address">Email</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
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
      </main>
    </article>
  );
};

export default SignIn;
