import React, { useState } from "react";
import countries from "../assets/countries.json";
import { ImEarth } from "react-icons/im";

function Body() {
  const [input, setInput] = useState("");
  return (
    <div className="body">
      <span className="main-icon">
        <ImEarth size={40}/>
      </span>
      <div className="shots">
        <input
          placeholder="Azerbaijan"
          className="search-input"
          type="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {countries
          .filter((country) =>
            country.name.toLowerCase().includes(input.toLowerCase())
          )
          .map((country) => {
            return (
              <div
                className={
                  country.inStore ? "country-card visited" : "country-card"
                }
                key={country.code}
              >
                {country.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Body;
