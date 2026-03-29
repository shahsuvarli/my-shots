function FlagIcon({ code, name, hidden = false, className = "" }) {
  const normalizedCode = code?.toUpperCase();

  if (!normalizedCode || hidden) {
    return null;
  }

  return (
    <span
      className={`fi fi-${normalizedCode.toLowerCase()} ${className}`.trim()}
      role="img"
      aria-label={`${name} flag`}
      title={`${name} flag`}
    />
  );
}

export default FlagIcon;
