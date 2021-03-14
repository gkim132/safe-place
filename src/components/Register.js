import React, { useState } from "react";

function Register({ setloadUser, setRoute, setIsSignedIn }) {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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
    fetch("http://localhost:3030/register", {
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
        if (user.id) {
          setloadUser(user);
          setRoute("map");
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
            <div className="actionButtons">
              <div></div>
              <div>
                <input
                  type="submit"
                  value="Register"
                  onClick={() => {
                    onSubmitRegister();
                    setIsSignedIn(true);
                  }}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </main>
    </article>
  );
}

export default Register;
