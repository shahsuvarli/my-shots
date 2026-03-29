import { useContext } from "react";
import { CountryContext } from "../App";

function Description() {
  const { filterMode, setFilterMode } = useContext(CountryContext);
  return (
    <div className="description-container">
      <button
        className="filter-button"
        type="button"
        aria-pressed={filterMode === "visited"}
        data-active={filterMode === "visited"}
        onClick={() => setFilterMode("visited")}
      >
        visited
      </button>
      <button
        className="filter-button"
        type="button"
        aria-pressed={filterMode === "all"}
        data-active={filterMode === "all"}
        onClick={() => setFilterMode("all")}
      >
        all
      </button>
      <button
        className="filter-button"
        type="button"
        aria-pressed={filterMode === "not-visited"}
        data-active={filterMode === "not-visited"}
        onClick={() => setFilterMode("not-visited")}
      >
        not visited
      </button>
    </div>
  );
}

export default Description;
