import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Graph from "./pages/Graph";
import Journal from "./pages/Journal";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/chat/:id" element={<Chat />} />
          <Route exact path="/graph/:id" element={<Graph />} />
          <Route exact path="/journal" element={<Journal />} />
        </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
