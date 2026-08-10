import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import GameDetails from "./pages/GameDetails";

function App() {
    const [favorites, setFavorites] = useState([]);

    return (
        <>
            <Navbar favorites={favorites} />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    }
                />

                <Route
                    path="/games"
                    element={<Games />}
                />

                <Route
                    path="/games/:id"
                    element={
                        <GameDetails
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    }
                />

                <Route
                    path="/favorites"
                    element={
                        <Favorites
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    }
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Routes>
        </>
    );
}

export default App;