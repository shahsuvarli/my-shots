import React, { useContext } from "react";
import { CountryContext } from "../App";
import "../styles/flag-modal.css";

function FlagModal() {
  const { show, country, setShow } = useContext(CountryContext);
  const handleModal = () => {
    setShow(!show);
  };
  return (
    <div
      className={`flag-modal ${show ? "show" : "hide"}`}
      onClick={handleModal}
    >
      <div className="modal-card">
        <span className="modal-header">

        {country.name}
        </span>
        <img
          src={`http://www.geonames.org/flags/x/${country.code.toLowerCase()}.gif`}
          alt={country.name}
        />
      </div>
    </div>
  );
}

export default FlagModal;
