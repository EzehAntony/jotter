import { React, useContext, useState } from "react";
import "./main.css";
import Cards from "../components/Cards";
import { UserContext } from "../UserContext";
import useFetch from "../useFetch";
import RoundedBtn from "../components/RoundedBtn";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
function Main() {
  const { user, setUser } = useContext(UserContext);
  const url = `/note/get/all/${JSON.parse(user)._id}`;
  const method = "get";
  const { data, loading, error } = useFetch(url, method);
  const [input, setInput] = useState("");

  return (
    <div className="main">
      {loading && <Loading />}
      {error &&<ErrorPage />}

      {data && (
        <input
          className="searchBar"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Search"}
        />
      )}
      {data && (
        <Link to="/note">
          <RoundedBtn />
        </Link>
      )}
      <div className="cardContainer">
        {data &&
          data
            .filter((note) => {
              if (input === "") {
                return note;
              } else if (
                note.title.toLowerCase().includes(input.toLowerCase())
              ) {
                return note;
              }
            })
            .map((data) => (
              <Link
                to={`/note:${data._id}`}
                className="cards-div"
                key={data._id}
              >
                <Cards data={data} />
              </Link>
            ))}
      </div>
    </div>
  );
}

export default Main;
