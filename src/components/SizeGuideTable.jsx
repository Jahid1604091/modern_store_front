import React from "react";

const MEASUREMENTS = [
  { key: "height", label: "Height" },
  { key: "width", label: "Width" },
];

// Reference table of every size's measurements, with the currently selected
// size highlighted — shown alongside the size picker so customers can see
// exactly what a size means instead of guessing from the label alone.
const SizeGuideTable = ({ sizes = [], sizeChart, selectedSize }) => {
  const rows = sizeChart?.rows || {};
  const unit = sizeChart?.unit || "in";

  const columns = MEASUREMENTS.filter((m) =>
    sizes.some((size) => rows[size]?.[m.key] !== undefined && rows[size]?.[m.key] !== "")
  );

  if (!columns.length) return null;

  return (
    <div className="pdp-size-guide">
      <table className="pdp-size-guide-table">
        <thead>
          <tr>
            <th>Size</th>
            {columns.map((m) => (
              <th key={m.key}>{m.label} ({unit})</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size} className={selectedSize === size ? "pdp-size-guide-row-active" : ""}>
              <td>{size}</td>
              {columns.map((m) => (
                <td key={m.key}>{rows[size]?.[m.key] ?? "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pdp-size-guide-note">Size may vary ±1 {unit}.</p>
    </div>
  );
};

export default SizeGuideTable;
