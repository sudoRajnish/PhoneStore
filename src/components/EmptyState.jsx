import { Link } from "react-router-dom";
import "./EmptyState.css";

function EmptyState({ icon, title, description, actionLabel, onAction, actionTo }) {
  return (
    <div className="empty-state">
      {icon && <span className="empty-state__icon">{icon}</span>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {actionLabel &&
        (actionTo ? (
          <Link to={actionTo} className="btn btn-primary">
            {actionLabel}
          </Link>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onAction}>
            {actionLabel}
          </button>
        ))}
    </div>
  );
}

export default EmptyState;
