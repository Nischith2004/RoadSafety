import { useState } from "react";
import "../frontend/components/Navbar";
import "./App.css";
import Navbar from "../frontend/components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="hello">hello</div>
    </>
  );
}

export default App;
