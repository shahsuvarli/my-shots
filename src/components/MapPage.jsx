import { useContext, useMemo, useState } from "react";
import world from "@svg-maps/world";
import countries from "../assets/countries.json";
import { CountryContext } from "../App";
import "../styles/map-page.css";

const supportedCodes = new Set(world.locations.map((location) => location.id.toUpperCase()));

function MapPage() {
  const { setCountry, setShow } = useContext(CountryContext);
  const [activeLocationCode, setActiveLocationCode] = useState(null);

  const countryLookup = useMemo(
    () => new Map(countries.map((item) => [item.code.toUpperCase(), item])),
    []
  );

  const collectedCountries = useMemo(
    () => countries.filter((item) => item.inStore),
    []
  );

  const supportedCountries = useMemo(
    () => countries.filter((item) => supportedCodes.has(item.code.toUpperCase())),
    []
  );

  const mappedLocations = useMemo(
    () => world.locations.filter((location) => countryLookup.has(location.id.toUpperCase())),
    [countryLookup]
  );

  const unsupportedCountries = useMemo(
    () => countries.filter((item) => !supportedCodes.has(item.code.toUpperCase())),
    []
  );

  const activeCountry = activeLocationCode
    ? countryLookup.get(activeLocationCode.toUpperCase()) ?? null
    : null;

  const openCountry = (countryCode) => {
    if (!countryCode) {
      return;
    }

    const matchedCountry = countryLookup.get(countryCode.toUpperCase());

    if (!matchedCountry) {
      return;
    }

    setCountry(matchedCountry);
    setShow(true);
  };

  const previewCountry = (countryCode) => {
    setActiveLocationCode(countryCode.toUpperCase());
  };

  const clearPreview = () => {
    setActiveLocationCode(null);
  };

  const openCountryFromKeyboard = (event, countryCode) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openCountry(countryCode);
  };

  return (
    <div className="body-container">
      <div className="body">
        <section className="shots map-page-shell">
          <div className="hero">
            <div className="hero-copy">
              <span className="hero-kicker">Alternative view</span>
              <h1 className="hero-title">Travel Map</h1>
              <p className="hero-subtitle">
                The map colors collected countries directly from your JSON and keeps the
                rest in a lighter neutral shade. Click any country to open its detail
                card.
              </p>
            </div>
            <div className="hero-stats" aria-label="Map summary">
              <div className="stat-pill">
                <strong>{collectedCountries.length}</strong>
                <span>collected</span>
              </div>
              <div className="stat-pill">
                <strong>{supportedCountries.length}</strong>
                <span>mapped regions</span>
              </div>
            </div>
          </div>

          <div className="map-legend" aria-label="Map legend">
            <span className="legend-item">
              <span className="legend-swatch legend-swatch-visited" aria-hidden="true" />
              collected
            </span>
            <span className="legend-item">
              <span className="legend-swatch legend-swatch-wishlist" aria-hidden="true" />
              wishlist
            </span>
          </div>

          <div className="map-card">
            <div className="map-status-card" aria-live="polite">
              {activeCountry ? (
                <>
                  <strong>{activeCountry.name}</strong>
                  <span>{activeCountry.inStore ? "Collected stop" : "Wishlist stop"}</span>
                </>
              ) : (
                <>
                  <strong>Map preview</strong>
                  <span>Hover, focus, or click a country to inspect it.</span>
                </>
              )}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={world.viewBox}
              className="travel-svg-map"
              role="img"
              aria-label={world.label}
            >
              {mappedLocations.map((location) => {
                const matchedCountry = countryLookup.get(location.id.toUpperCase());
                const classes = ["travel-svg-map__location"];

                if (matchedCountry?.inStore) {
                  classes.push("is-visited");
                } else {
                  classes.push("is-wishlist");
                }

                if (activeLocationCode === location.id.toUpperCase()) {
                  classes.push("is-active");
                }

                return (
                  <path
                    key={location.id}
                    d={location.path}
                    className={classes.join(" ")}
                    tabIndex={0}
                    role="button"
                    aria-label={`${matchedCountry?.name ?? location.name}, ${
                      matchedCountry?.inStore ? "collected" : "wishlist"
                    }`}
                    onMouseOver={() => previewCountry(location.id)}
                    onMouseOut={clearPreview}
                    onFocus={() => previewCountry(location.id)}
                    onBlur={clearPreview}
                    onClick={() => openCountry(location.id)}
                    onKeyDown={(event) => openCountryFromKeyboard(event, location.id)}
                  >
                    <title>
                      {(matchedCountry?.name ?? location.name) +
                        `: ${matchedCountry?.inStore ? "Collected" : "Wishlist"}`}
                    </title>
                  </path>
                );
              })}
            </svg>
          </div>

          <div className="map-notes">
            <div className="map-note-card">
              <span className="map-note-label">Coverage</span>
              <p>
                This world dataset renders {supportedCountries.length} of {countries.length}
                entries from your JSON. The only entries outside the map source are{" "}
                {unsupportedCountries.map((item) => item.name).join(" and ")}.
              </p>
            </div>

            <div className="map-note-card">
              <span className="map-note-label">Off-map entries</span>
              <div className="map-chip-list">
                {unsupportedCountries.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className="map-country-chip"
                    onClick={() => openCountry(item.code)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="map-note-card">
            <span className="map-note-label">Collected countries</span>
            <div className="map-chip-list">
              {collectedCountries.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className="map-country-chip"
                  onClick={() => openCountry(item.code)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MapPage;
