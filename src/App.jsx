import "./styles/App.css";
import Body from "./components/Body";
import FlagModal from "./components/FlagModal";
import { Suspense, createContext, lazy, useState } from "react";

export const CountryContext = createContext();
const MapPage = lazy(() => import("./components/MapPage"));

function App() {
  const [country, setCountry] = useState({
    name: "Elvin",
    code: "az",
    inStore: false,
    hidden: false,
  });
  const [show, setShow] = useState(false);
  const [filterMode, setFilterMode] = useState("all");
  const [pageMode, setPageMode] = useState("collection");

  return (
    <div className="App">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <CountryContext.Provider
        value={{ country, setCountry, show, setShow, filterMode, setFilterMode }}
      >
        <nav className="page-switcher" aria-label="Main">
          <button
            type="button"
            className="page-switcher-button"
            data-active={pageMode === "collection"}
            onClick={() => setPageMode("collection")}
          >
            Collection
          </button>
          <button
            type="button"
            className="page-switcher-button"
            data-active={pageMode === "map"}
            onClick={() => setPageMode("map")}
          >
            Map
          </button>
        </nav>
        <main id="main-content">
          <FlagModal />
          {pageMode === "collection" ? (
            <Body />
          ) : (
            <Suspense fallback={<div className="page-loading">Loading map...</div>}>
              <MapPage />
            </Suspense>
          )}
        </main>
      </CountryContext.Provider>
    </div>
  );
}

export default App;
