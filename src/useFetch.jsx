import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, method) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [head, setHead] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getData(url, method);
  }, []);

  const getData = async (url, method) => {
    setLoading(true);
    setError(false);
    try {
      await axios({
        url: `https://git.heroku.com/crayonnne-jotter-server.git/api${url}`,
        method: method,
        withCredentials: true,
      }).then((res) => {
        setHead(res.data.title);
        setContent(res.data.content);
        setData(res.data);
        setLoading(false);
        setError(false);
      });
    } catch (err) {
      if (err.response.status == "500") {
        setError("Network error");
      } else {
        setError(err.message);
      }
      setLoading(false);
    }
  };
  return { data, loading, error, head, setHead, content, setContent };
};

export default useFetch;
