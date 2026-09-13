import "./FeatureCard.css";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <span className="feature-card__icon" aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
