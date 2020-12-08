import React, { useState } from "react";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./config/Routes";
import "./assets/App.css";
import UserApi from "./backend/user";


function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("id"));

  const storeUser = userId => {
    localStorage.setItem("id", userId);
    setCurrentUser(userId);
  };

  const logout = event => {
    event.preventDefault();

    localStorage.removeItem("id");

    UserApi.logout().then(res => {
      setCurrentUser(null);
    });
  };

  return (
    <div className="App">
      <Header currentUser={currentUser} logout={logout} />
      <Routes currentUser={currentUser} storeUser={storeUser} />
    </div>
  );
}

export default App;
