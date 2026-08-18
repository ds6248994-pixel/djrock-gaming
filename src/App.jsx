import "./App.css";
import Navbar from "./components/Navbar";
import DJRockAI from "./components/DJRockAI";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import API_URL from "./lib/api";

import { supabase } from "./lib/supabase";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import GameDetails from "./pages/GameDetails";
import ScoreTest from "./pages/ScoreTest";
import Leaderboard from "./pages/Leaderboard";
import MyScores from "./pages/MyScores";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Prevent old user's favorite request
  // from updating the new user's favorites.
  const favoritesRequest = useRef(0);

  // ================================
  // INITIAL SESSION + AUTH LISTENER
  // ================================
  useEffect(() => {
    let mounted = true;

    async function loadInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setAuthLoading(false);
    }

    loadInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!mounted) return;

        // Immediately update current user/session
        setSession(newSession);
        setUser(newSession?.user ?? null);

        // IMPORTANT:
        // Clear old user's favorites immediately.
        if (!newSession?.user) {
          setFavorites([]);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ================================
  // LOAD FAVORITES WHEN USER CHANGES
  // ================================
  useEffect(() => {
    let cancelled = false;

    async function loadUserFavorites() {
      if (!session?.user) {
        setFavorites([]);
        return;
      }

      const requestId =
        ++favoritesRequest.current;

      try {
        const response = await fetch(
          `${API_URL}/api/favorites`,
          {
            headers: {
              Authorization:
                `Bearer ${session.access_token}`,
            },
          }
        );

        const result =
          await response.json();

        if (!response.ok) {
          console.error(
            "Favorites Load Error:",
            result
          );

          if (!cancelled) {
            setFavorites([]);
          }

          return;
        }

        // Ignore old request
        if (
          cancelled ||
          requestId !==
            favoritesRequest.current
        ) {
          return;
        }

        const ids = (
          result.favorites || []
        ).map((item) =>
          Number(item.game_id)
        );

        setFavorites(ids);

      } catch (error) {
        console.error(
          "Load Favorites Error:",
          error
        );

        if (
          !cancelled &&
          requestId ===
            favoritesRequest.current
        ) {
          setFavorites([]);
        }
      }
    }

    loadUserFavorites();

    return () => {
      cancelled = true;
    };
  }, [
    session?.user?.id,
    session?.access_token,
  ]);

  // ================================
  // TOGGLE FAVORITE
  // ================================
  async function toggleFavorite(gameId) {
    try {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!currentSession?.user) {
        navigateToLogin();
        return;
      }

      const numericGameId =
        Number(gameId);

      const isFavorite =
        favorites.includes(
          numericGameId
        );

      let response;

      // ================================
      // REMOVE FAVORITE
      // ================================
      if (isFavorite) {
        response = await fetch(
          `${API_URL}/api/favorites/${numericGameId}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                `Bearer ${currentSession.access_token}`,
            },
          }
        );
      }

      // ================================
      // ADD FAVORITE
      // ================================
      else {
        response = await fetch(
          "`${API_URL}/api/favorites/${numericGameId}`",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${currentSession.access_token}`,
            },

            body: JSON.stringify({
              game_id:
                numericGameId,
            }),
          }
        );
      }

      const result =
        await response.json();

      if (!response.ok) {
        console.error(
          "Favorite Error:",
          result
        );
        return;
      }

      // ================================
      // UPDATE STATE SAFELY
      // ================================
      if (isFavorite) {
        setFavorites((current) =>
          current.filter(
            (id) =>
              Number(id) !==
              numericGameId
          )
        );
      } else {
        setFavorites((current) => {
          // Prevent duplicate in React state
          if (
            current.includes(
              numericGameId
            )
          ) {
            return current;
          }

          return [
            ...current,
            numericGameId,
          ];
        });
      }

    } catch (error) {
      console.error(
        "Toggle Favorite Error:",
        error
      );
    }
  }

  // ================================
  // LOGIN REDIRECT
  // ================================
  function navigateToLogin() {
    window.location.href =
      "/login";
  }

  // ================================
  // AUTH LOADING
  // ================================
  if (authLoading) {
    return (
      <div className="game-not-found">
        <h1>
          Loading DJROCK... 🎮
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar
        favorites={favorites}
        user={user}
      />

      <DJRockAI />

      <Routes>

        {/* ================================
            HOME
        ================================ */}
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              setFavorites={
                setFavorites
              }
              toggleFavorite={
                toggleFavorite
              }
            />
          }
        />

        {/* ================================
            GAMES
        ================================ */}
        <Route
          path="/games"
          element={
            <Games
              favorites={favorites}
              toggleFavorite={
                toggleFavorite
              }
            />
          }
        />

        {/* ================================
            GAME DETAILS
        ================================ */}
        <Route
          path="/games/:id"
          element={
            <GameDetails
              favorites={favorites}
              toggleFavorite={
                toggleFavorite
              }
            />
          }
        />

        {/* ================================
            FAVORITES
        ================================ */}
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              toggleFavorite={
                toggleFavorite
              }
            />
          }
        />

        {/* ================================
            CONTACT
        ================================ */}
        <Route
          path="/contact"
          element={
            <Contact />
          }
        />

        {/* ================================
            LOGIN
        ================================ */}
        <Route
          path="/login"
          element={
            <Login />
          }
        />

        {/* ================================
            REGISTER
        ================================ */}
        <Route
          path="/register"
          element={
            <Register />
          }
        />

        {/* ================================
            SCORE TEST
        ================================ */}
        <Route
          path="/score-test"
          element={
            user ? (
              <ScoreTest />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* ================================
    LEADERBOARD
================================ */}
<Route
  path="/leaderboard"
  element={
    user ? (
      <Leaderboard />
    ) : (
      <Navigate
        to="/login"
        replace
      />
    )
  }
/>

        {/* ================================
    MY SCORES
================================ */}
<Route
  path="/my-scores"
  element={
    user ? (
      <MyScores />
    ) : (
      <Navigate
        to="/login"
        replace
      />
    )
  }
/>
    
        {/* ================================
            PROFILE
        ================================ */}
        <Route
          path="/profile"
          element={
            user ? (
              <Profile
                user={user}
              />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

      </Routes>
    </>
  );
}

export default App;