import "./SpecsTable.css";

const SPEC_LABELS = {
  display: "Display",
  processor: "Processor",
  ram: "RAM",
  storage: "Storage",
  camera: "Camera",
  battery: "Battery",
  os: "Operating System",
};

function SpecsTable({ specs }) {
  return (
    <dl className="specs-table">
      {Object.entries(SPEC_LABELS).map(([key, label]) => (
        <div className="specs-table__row" key={key}>
          <dt>{label}</dt>
          <dd>{specs[key] || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export default SpecsTable;
