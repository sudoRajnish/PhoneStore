import "./StatusBadge.css";

// Generic colored pill for short status labels — payment status here,
// reusable anywhere else a simple status tag is needed later.
function StatusBadge({ label, tone = "neutral" }) {
  return <span className={`status-badge status-badge--${tone}`}>{label}</span>;
}

export default StatusBadge;
