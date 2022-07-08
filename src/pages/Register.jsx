/** @format */

import React from "react";
import Authentication from "../components/Authentication";

function Register() {
  document.title = "Register";

  return (
    <Authentication
      text={"Already"}
      action="login"
      path={"http://localhost:5000/api/auth/register"}
      to={"/login"}
    />
  );
}

export default Register;
