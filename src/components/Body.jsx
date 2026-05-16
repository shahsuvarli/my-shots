import React, { useContext, useState } from "react";
import countries from "../assets/countries.json";
import { ImEarth } from "react-icons/im";
import CountryCard from "./CountryCard";
import FlagModal from "./FlagModal";
import { CountryContext } from "../App";
import Description from "./Description";
import "../styles/description.css";

function Body() {
  const { setCountry, show, setShow, visited } = useContext(CountryContext);
  const [input, setInput] = useState("");

  const handleCard = (country) => {
    setShow(!show);
    setCountry(country);
  };

  return (
    <div className="body-container">
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
          <Description />
          <div className="cards-container">
            {countries
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(input.toLowerCase()) &&
                  item.inStore !== visited
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
    </div>
  );
}

export default Body;
