import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Newnote() {
  document.title = "New Note";

  const [content, setContent] = useState("");
  const [head, setHead] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const url = `https://git.heroku.com/crayonnejotter.git/api/note/create/${userId}`;

  const submit = async (e) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError(false);
      e.preventDefault();
      await axios({
        url: url,
        method: "post",
        withCredentials: true,
        data: {
          title: head,
          content: content,
        },
      }).then((res) => {
        setError(false);
        setLoading(false);
        setSuccess(true);
        navigate("/");
      });
    } catch (err) {
      setSuccess(false);
      setLoading(false);
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className="notePage">
      <Header />
      <div className="noteContent">
        {
          <textarea
            placeholder="Note Title"
            className="noteContentTitle"
            type="text"
            value={head}
            onChange={(e) => {
              setHead(e.target.value);
            }}
          />
        }
        {
          <textarea
            placeholder="Note Content"
            className="noteText"
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        }
        {loading && <Loading />}

        <div className="notePageButtons">
          <button type="submit" onClick={submit} className="notePageSave">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newnote;
