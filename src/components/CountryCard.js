import React from "react";

function CountryCard({ country }) {
  return (
    <div
      className={country.inStore ? "country-card visited" : "country-card"}
      key={country.code}
    >
      <img
        // src={`http://www.geonames.org/flags/x/${country.code.toLowerCase()}.gif`}
        src={`https://flagicons.lipis.dev/flags/4x3/${country.code.toLowerCase()}.svg`}
        style={{ width: 25, flex: 1 }}
        alt={country.name}
      />
      <span style={{ flex: 3 }}>{country.name}</span>
    </div>
  );
}

export default CountryCard;
