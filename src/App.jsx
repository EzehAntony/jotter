import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import { useState } from "react";
import { UserContext } from "./UserContext";
import Note from "./pages/Note";
import Newnote from "./pages/Newnote";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Routes>
            {user && <Route path={"/login"} element={<Home />} />}
            {user && <Route exact path={"/register"} element={<Home />} />}
            {user && <Route path={"*"} element={<Home />} />}
            {user && <Route path={"/dashboard"} element={<Dashboard />} />}
            {user && <Route path={"/"} element={<Home />} />}
            {!user && <Route path={"*"} element={<Login />} />}
            <Route path={"/login"} element={<Login />} />
            <Route exact path={"/register"} element={<Register />} />
            <Route path={"/note:id"} element={<Note />} />
            <Route path={"/note"} element={<Newnote />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
