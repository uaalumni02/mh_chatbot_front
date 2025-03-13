import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
