import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;