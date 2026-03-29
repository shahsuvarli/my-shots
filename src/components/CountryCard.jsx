import FlagIcon from "./FlagIcon";

function CountryCard({ country }) {
  return (
    <div className={country.inStore ? "country-card visited" : "country-card"}>
      <FlagIcon
        code={country.code}
        name={country.name}
        hidden={country.hidden}
        className="country-flag"
      />
      <div className="country-copy">
        <span className="country-name">{country.name}</span>
        <span className="country-tag">{country.inStore ? "collected" : "wishlist"}</span>
      </div>
    </div>
  );
}

export default CountryCard;
