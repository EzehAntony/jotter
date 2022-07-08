import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./authentication.css";
import { UserContext } from "../UserContext";
import Loading from "./Loading";

import Error from "./Error";

const Authentication = ({ text, action, path, to }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await axios({
        url: path,
        method: "post",
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      }).then((res) => {
        setSuccess(true);
        if (action == "register") {
          const value = JSON.stringify(res.data);
          localStorage.setItem("user", value);
          setUser(localStorage.getItem("user"));
          navigate("/");
        } else {
          navigate("/login");
        }
      });
    } catch (err) {
      setSuccess(false);
      setLoading(false);
      console.log(err);
      switch(err.response.status) {
        case 500: return setError("Netowk error");
        case 403: return setError("Invalid username or password");
        case 404: return setError("Not found");
      }
    }
  };

  return (
    <div className="login">
      <div className="custom-shape-divider-top-1656840499">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="left">
        <p>
          {text} have an account? <Link to={to}> {action} </Link>
        </p>

        <form className="form" onSubmit={submit}>
          <h1>
            Welcome to <span>Jotter</span>
          </h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            facere error iste laborum voluptatum sequi minus expedita fugiat
            repellendus id.
          </h2>

          <div className="input">
            <div className="userLabel">
              <h3 className="username">username</h3>
              <input
                className="authInput"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="userLabel">
              <h3 className="username">password</h3>
              <input
                className="authInput"
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button onSubmit={submit} type="submit">
              submit
            </button>
          </div>
          {loading && <Loading />}
          {success && <h3 className="error">Login successful</h3>}
          {error && <Error data={error} />}
        </form>
      </div>
      <div className="right">
        <img className="noteImg" src="/note2.svg" alt="" />
      </div>
    </div>
  );
};

export default Authentication;
