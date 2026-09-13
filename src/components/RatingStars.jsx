import "./RatingStars.css";

// Renders 5 stars, filled up to the nearest whole star for `rating`.
function RatingStars({ rating, size = 14 }) {
  const filled = Math.round(rating);

  return (
    <span className="rating-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} filled={index < filled} size={size} />
      ))}
    </span>
  );
}

function StarIcon({ filled, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={filled ? "is-filled" : ""}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default RatingStars;
