import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../frontend/components/Navbar";
import Prediction from "../frontend/components/Prediction";
import Sos from "../frontend/components/SOS";
import Home from "../frontend/components/Home";
import Maps from "../frontend/components/Maps";

function App() {
  const [page, setPage] = useState("herosection");
  const updatepage = (text) => {
    setPage(text);
  };
  return (
    <>
      <Navbar changepage={updatepage} />
      <div className="pages">
        <Routes>
          <Route path="/" element={<div className="herosection">hello</div>} />
          <Route path="/map" element={<Maps />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/news"
            element={
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita nobis, temporibus dolores, illum quis excepturi
                laboriosam aut molestiae beatae veritatis vitae maxime ipsam.
                Commodi quia, quae eum earum minus repellat! hello{page}
              </p>
            }
          />
          <Route
            path="/profile"
            element={
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita nobis, temporibus dolores, illum quis excepturi
                laboriosam aut molestiae beatae veritatis vitae maxime ipsam.
                Commodi quia, quae eum earum minus repellat! hello{page}
              </p>
            }
          />
          <Route
            path="/contact"
            element={
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita nobis, temporibus dolores, illum quis excepturi
                laboriosam aut molestiae beatae veritatis vitae maxime ipsam.
                Commodi quia, quae eum earum minus repellat! hello{page}
              </p>
            }
          />
        </Routes>

        <Sos className="sos" />
      </div>
    </>
  );
}

export default App;
