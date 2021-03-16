import React, { useState } from "react";
import "./Register.css";

function Register({
  setloadUser,
  setRoute,
  setIsSignedIn,
  isHerokuAwake,
  setIsHerokuAwake,
}) {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(true);
  const onNameChange = (event) => {
    setRegisterName(event.target.value);
  };

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };

  const onSubmitRegister = () => {
    setIsHerokuAwake(false);
    fetch("https://safe-place-nodejs-backend.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
        joined: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user !== "Register Error" && user.id) {
          setIsHerokuAwake(true);
          setloadUser(user);
          setRoute("map");
          setIsSignedIn(true);
        } else {
          setIsRegisterSuccess(false);
        }
      });
  };
  return (
    <article className="SignIn Register">
      <main>
        <div>
          <fieldset id="sign_up">
            <legend>Register</legend>
            <h5>Safe Place</h5>
            {!isHerokuAwake ? (
              <div>
                <img
                  className="spinner"
                  src="/spinner-blue.svg"
                  alt="spinner-solid"
                />
                <h5>Signing Up...</h5>
              </div>
            ) : (
              <div>
                <div className="control">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={onNameChange}
                    placeholder="Name"
                  />
                </div>
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
                {!isRegisterSuccess && (
                  <div>
                    <p>That email is taken. Try another.</p>
                  </div>
                )}
                <div className="actionButtons">
                  <div></div>
                  <div>
                    <input
                      type="submit"
                      value="Register"
                      onClick={() => {
                        onSubmitRegister();
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </fieldset>
        </div>
      </main>
    </article>
  );
}

export default Register;
