import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import InboxPage from "./pages/inbox";
import { Route, BrowserRouter as Routers, Routes } from "react-router-dom";

function App() {
  return (
    <Routers>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Routers>
  );
}

export default App;
