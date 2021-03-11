import React from "react";

function Register({ setloadUser, setRoute, setIsSignedIn }) {
  return (
    <article>
      <main>
        <div>
          <fieldset id="sign_up">
            <legend>Register</legend>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
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
              type="submit"
              value="Register"
              onClick={() => {
                setIsSignedIn(true);
              }}
            />
          </div>
        </div>
      </main>
    </article>
  );
}

export default Register;
