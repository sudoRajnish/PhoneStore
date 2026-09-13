import RatingStars from "./RatingStars.jsx";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const { author, rating, date, title, comment } = review;

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="review-card">
      <div className="review-card__header">
        <span className="review-card__avatar">{author.charAt(0)}</span>
        <div>
          <p className="review-card__author">{author}</p>
          <RatingStars rating={rating} size={13} />
        </div>
        <span className="review-card__date">{formattedDate}</span>
      </div>
      <h4 className="review-card__title">{title}</h4>
      <p className="review-card__comment">{comment}</p>
    </article>
  );
}

export default ReviewCard;
