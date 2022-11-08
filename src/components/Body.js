import React, { useContext, useState } from "react";
import countries from "../assets/countries.json";
import { ImEarth } from "react-icons/im";
import CountryCard from "./CountryCard";
import FlagModal from "./FlagModal";
import { CountryContext } from "../App";

function Body() {
  const data = useContext(CountryContext);
  const [mine, setMine] = useState(data);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const handleCard = (country) => {
    setShow(!show);
    setMine(country);
  };
  return (
    <div>
      <FlagModal show={show} country={mine} />
      <div className="body">
        <span className="main-icon">
          <ImEarth size={40} />
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
                  key={country.code}
                  onClick={() => handleCard(country)}
                >
                  <CountryCard country={country} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Body;
