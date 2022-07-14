/** @format */

import React from "react";
import Authentication from "../components/Authentication";

function Register() {
  document.title = "Register";

  return (
    <Authentication
      text={"Already"}
      action="login"
      path={"https://crayonnejotter.herokuapp.com/api/auth/register"}
      to={"/login"}
    />
  );
}

export default Register;
