import { useState } from "react";

import "./App.css";
import Navbar from "../frontend/components/Navbar";
import Prediction from "../frontend/components/Prediction";
import Sos from "../frontend/components/SOS";
function App() {
  const [page, setPage] = useState("herosection");
  const updatepage = (text) => {
    setPage(text);
  };
  return (
    <>
      <Navbar changepage={updatepage} />
      <div className="pages">
        {page === "herosection" ? (
          <div className="main">
            <div className="herosection">hello</div>
          </div>
        ) : page === "Prediction" ? (
          <Prediction />
        ) : (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            nobis, temporibus dolores, illum quis excepturi laboriosam aut
            molestiae beatae veritatis vitae maxime ipsam. Commodi quia, quae
            eum earum minus repellat! hello{page}
          </p>
        )}
        <Sos className="sos" />
      </div>
    </>
  );
}

export default App;
