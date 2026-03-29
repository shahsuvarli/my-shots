import { useContext, useState } from "react";
import countries from "../assets/countries.json";
import CountryCard from "./CountryCard";
import { CountryContext } from "../App";
import Description from "./Description";
import "../styles/description.css";

const visitedCount = countries.filter((item) => item.inStore).length;
const totalCount = countries.length;

function Body() {
  const { setCountry, setShow, filterMode } = useContext(CountryContext);
  const [input, setInput] = useState("");

  const handleCard = (country) => {
    setShow(true);
    setCountry(country);
  };

  const normalizedInput = input.trim().toLowerCase();
  const filteredCountries = countries.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(normalizedInput);
    const matchesFilter =
      filterMode === "all" ||
      (filterMode === "visited" && item.inStore) ||
      (filterMode === "not-visited" && !item.inStore);

    return matchesSearch && matchesFilter;
  });

  const filterLabels = {
    all: "showing everything",
    visited: "visited only",
    "not-visited": "wishlist only",
  };

  return (
    <div className="body-container">
      <div className="body">
        <div className="shots">
          <div className="hero">
            <div className="hero-copy">
              <span className="hero-kicker">Travel keepsakes</span>
              <h1 className="hero-title">My Shots</h1>
              <p className="hero-subtitle">
                A small atlas of countries visited and the souvenir shot glasses
                brought back home.
              </p>
            </div>
            <div className="hero-stats" aria-label="Trip summary">
              <div className="stat-pill">
                <strong>{visitedCount}</strong>
                <span>collected</span>
              </div>
              <div className="stat-pill">
                <strong>{totalCount - visitedCount}</strong>
                <span>to go</span>
              </div>
            </div>
          </div>
          <div className="toolbar">
            <label className="search-field">
              <span className="search-label">Search the atlas</span>
              <input
                placeholder="Azerbaijan"
                className="search-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
            <div className="toolbar-footer">
              <Description />
              <div className="results-meta" aria-live="polite">
                <span>{filteredCountries.length} countries</span>
                <span>{filterLabels[filterMode]}</span>
              </div>
            </div>
          </div>
          <div className="cards-container">
            {filteredCountries.map((item) => {
              return (
                <button
                  key={item.code}
                  type="button"
                  className="country-card-trigger"
                  onClick={() => handleCard(item)}
                >
                  <CountryCard country={item} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
