import React, { useState } from "react";
import "../styles/flag-modal.css";

function FlagModal(props) {
  return (
    <div className={`flag-modal ${props.show ? "show" : "hide"}`}>
      <div className="modal-card">
        {props.country.name}
        <img
          src={`http://www.geonames.org/flags/x/${props.country?.code.toLowerCase()}.gif`}
          alt={props.country?.name}
        />
      </div>
    </div>
  );
}

export default FlagModal;
