import { useContext } from "react";
import { CountryContext } from "../App";
import FlagIcon from "./FlagIcon";
import "../styles/flag-modal.css";

function FlagModal() {
  const { show, country, setShow } = useContext(CountryContext);
  const flagHidden = Boolean(country.hidden);
  const handleModal = () => {
    setShow(false);
  };
  return (
    <div
      className={`flag-modal ${show ? "show" : "hide"}`}
      onClick={handleModal}
      role="presentation"
    >
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-header"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="modal-kicker">{country.inStore ? "Collected souvenir" : "Wishlist stop"}</span>
        <span className="modal-header" id="modal-header">
          {country.name}
        </span>
        {flagHidden ? (
          <div className="modal-flag-hidden">Flag hidden by configuration</div>
        ) : (
          <FlagIcon
            code={country.code}
            name={country.name}
            hidden={country.hidden}
            className="modal-flag"
          />
        )}
        <span className="modal-note">
          {flagHidden
            ? "Set `hidden` to false in the country JSON to show this flag again."
            : "Click outside the card to close"}
        </span>
      </div>
    </div>
  );
}

export default FlagModal;
