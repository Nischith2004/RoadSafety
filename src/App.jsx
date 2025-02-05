import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "../frontend/components/supabaseClient";
import "./App.css";
import Navbar from "../frontend/components/Navbar";
import Prediction from "../frontend/components/Prediction";
import Sos from "../frontend/components/SOS";
import Home from "../frontend/components/Home";
import Maps from "../frontend/components/Maps";

import Login from "../frontend/components/Login";
import Signup from "../frontend/components/Signup";

import Profiles from "../frontend/components/Profiles";
import { colors } from "@mui/material";


function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [page, setPage] = useState("herosection");

  useEffect(() => {
    // Check for session on initial load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false); // Set loading to false once session is checked
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
    return <div>Loading...</div>; // Show a loading indicator while checking session
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
          <Route path="/" element={session ? <Home /> : <Navigate to="/login" />} />
          <Route path="/map" element={session ? <Maps /> : <Navigate to="/login" />} />
          <Route path="/prediction" element={session ? <Prediction /> : <Navigate to="/login" />} />
          <Route
            path="/news"
            element={

              session ? (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita nobis, temporibus dolores, illum quis excepturi
                  laboriosam aut molestiae beatae veritatis vitae maxime ipsam.
                  Commodi quia, quae eum earum minus repellat! hello {page}
                </p>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              session ? (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita nobis, temporibus dolores, illum quis excepturi
                  laboriosam aut molestiae beatae veritatis vitae maxime ipsam.
                  Commodi quia, quae eum earum minus repellat! hello {page}
                </p>
              ) : (
                <Navigate to="/login" />
              )

            }
          />
          <Route path="/profile" element={<Profiles />} />
          <Route
            path="/contact"
            element={

              session ? (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita nobis, temporibus dolores, illum quis excepturi
                  laboriosam aut molestiae beatae veritatis vitae maxime ipsam.
                  Commodi quia, quae eum earum minus repellat! hello {page}
                </p>
              ) : (
                <Navigate to="/login" />
              )

            }
          />
        </Routes>

        <Sos className="sos" />
      </div>
    </>
  );
}

export default App;