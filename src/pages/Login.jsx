import React from "react";
import Authentication from "../components/Authentication";

function Login() {
  document.title = "Login";

  return (
    <Authentication
      text={"Don't"}
      action="register"
      path={"http://localhost:5000/api/auth/login"}
      to={"/register"}
    />
  );
}
export default Login;
