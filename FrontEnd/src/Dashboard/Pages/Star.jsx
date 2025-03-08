const Star = ({ type = "null", size = 18 }) => {
  const colors = {
    null: "transparent",
    none: "white",
    silver: "#C0C0C0",
    bronze: "#CD7F32",
    gold: "#FFD700",
  };

  const strokeColor = type === "none" ? "black" : colors[type];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={colors[type]}
      stroke={strokeColor}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="star"
    >
      <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9" />
    </svg>
  );
};

export default Star;
