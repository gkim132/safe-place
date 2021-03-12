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
    // console.log(this.state);
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
          console.log("Register respose:", user);
        }
      });
  };
  return (
    <article>
      <main>
        <div>
          <fieldset id="sign_up">
            <legend>Register</legend>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
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
              type="submit"
              value="Register"
              onClick={() => {
                onSubmitRegister();
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
