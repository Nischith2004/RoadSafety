import { useState } from "react";

import "./App.css";
import Navbar from "../frontend/components/Navbar";

import Sos from "../frontend/components/SOS";
function App() {
  const [page, setPage] = useState("herosection");
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="herosection">hello</div>
        <Sos className="sos" />
      </div>
    </>
  );
}

export default App;
