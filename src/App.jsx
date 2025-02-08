// App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "../frontend/components/supabaseClient";
import Navbar from "../frontend/components/Navbar";
import Home from "../frontend/components/Home";
import Maps from "../frontend/components/Maps";
import Prediction from "../frontend/components/Prediction";
import Login from "../frontend/components/Login";
import Signup from "../frontend/components/Signup";
import ProfilePage from "../frontend/components/ProfilePage";
import Sos from "../frontend/components/SOS";
import Contact from "../frontend/components/Contact";
import News from "../frontend/components/News"
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("herosection");

  useEffect(() => {
    // Check for an active session on initial load.
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  const updatePage = (text) => {
    setPage(text);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar changepage={updatePage} session={session} />
      <div className="pages">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/map"
            element={session ? <Maps /> : <Navigate to="/login" />}
          />
          <Route
            path="/prediction"
            element={session ? <Prediction /> : <Navigate to="/login" />}
          />
          {/* Profile Page Route */}
          <Route
            path="/profilepage"
            element={session ? <ProfilePage /> : <Navigate to="/login" />}
          />
          {/* Add any other routes you need */}
          <Route
            path="/contact"
            element={session ? <Contact /> : <Navigate to="/login" />}
          />
          <Route
            path="/news"
            element={session ? <News /> : <Navigate to="/login" />}
          />
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>

        <Sos className="sos" />
      </div>
    </>
  );
}

export default App;
