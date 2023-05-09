import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, NavLink, BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./game/Game";
import "./styles.css";
import "./input.css"
import { GameProvider } from "./contexts/GameContext";

function Navigator(props) {
  return(
    <>
      <nav className="flex justify-center bg-amber-900">
        <NavLink to="/game" className={({ isActive }) => (isActive ? "w-1/2 text-center font-bold bg-white p-2" : "w-1/2 text-white text-center font-bold hover:bg-amber-700 p-2")}>Game</NavLink>
        <NavLink to="/results" className={({ isActive }) => (isActive ? "w-1/2 text-center font-bold bg-white p-2" : "w-1/2 text-white text-center font-bold hover:bg-amber-700 p-2")}>Results</NavLink>
      </nav>
      {props.children}
    </>
  )
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <GameProvider>
      <BrowserRouter>
        <Navigator>
          <Routes>
            <Route path ="/" element={<Navigate to="/game" />} />
            <Route path ="/game" element={<Game />} />
            <Route path ="/results" element={<></>} />
          </Routes>
        </Navigator>
      </BrowserRouter>
    </GameProvider>
  </StrictMode>
);


