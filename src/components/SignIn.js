import React from "react";

const SignIn = ({ setloadUser, setRoute, setIsSignedIn }) => {
  return (
    <article>
      <main>
        <div>
          <fieldset id="sign_up">
            <legend>Sign In</legend>
            <div>
              <label htmlFor="email-address">Email</label>
              <input type="email" name="email-address" id="email-address" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
          </fieldset>
          <div>
            <input
              onClick={() => {
                setIsSignedIn(true);
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
