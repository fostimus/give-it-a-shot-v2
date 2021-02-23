import React, { useState } from "react";
import { Header } from "./components/Header";
import Routes from "./config/Routes";
import "./assets/App.css";
import UserApi from "./backend/user";

export const AppContext = React.createContext(0);

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
      <AppContext.Provider value={currentUser}>
        <Header logout={logout} />
        <Routes storeUser={storeUser} logout={logout} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
