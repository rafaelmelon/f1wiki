import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Seasons from "./pages/Seasons";
import Season from "./pages/Season";
import Race from "./pages/Race";
import Drivers from "./pages/Drivers";
import Driver from "./pages/Driver";
import Compare from "./pages/Compare";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="seasons" element={<Seasons />} />
        <Route path="season/:year" element={<Season />} />
        <Route path="season/:year/race/:round" element={<Race />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="driver/:driverId" element={<Driver />} />
        <Route path="compare" element={<Compare />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
