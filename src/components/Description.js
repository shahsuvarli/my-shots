import React, { useContext } from "react";
import { CountryContext } from "../App";

function Description() {
  const { setVisited } = useContext(CountryContext);
  return (
    <div className="description-container">
      <button id="visited" onClick={() => setVisited(false)}>
        visited
      </button>
      <button id="all" onClick={() => setVisited({})}>
        all
      </button>
      <button id="not-visited" onClick={() => setVisited(true)}>
        not visited
      </button>
    </div>
  );
}

export default Description;
