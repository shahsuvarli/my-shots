import React, { useContext, useState } from "react";
import countries from "../assets/countries.json";
import { ImEarth } from "react-icons/im";
import CountryCard from "./CountryCard";
import FlagModal from "./FlagModal";
import { CountryContext } from "../App";

function Body() {
  const { setCountry, show, setShow } = useContext(CountryContext);
  const [input, setInput] = useState("");

  const handleCard = (country) => {
    setShow(!show);
    setCountry(country);
  };

  return (
    <div>
      <FlagModal />
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
            .filter((item) =>
              item.name.toLowerCase().includes(input.toLowerCase())
            )
            .map((item) => {
              return (
                <div key={item.code} onClick={() => handleCard(item)}>
                  <CountryCard country={item} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Body;
