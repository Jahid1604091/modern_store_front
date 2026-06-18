import React, { useState } from "react";
import AlertDismissible from "./Alert";

const EASE = { in: 1, cm: 2.5 };

function recommendSize(sizeChart, userMeasurement) {
  const unit = sizeChart.unit || "in";
  const ease = EASE[unit] ?? 1;
  const rows = Object.entries(sizeChart.rows || {})
    .filter(([, v]) => typeof v?.width === "number" && v.width > 0)
    .sort((a, b) => a[1].width - b[1].width);

  if (!rows.length) return null;

  for (const [size, data] of rows) {
    if (userMeasurement <= data.width + ease) {
      let note = "true to size";
      if (userMeasurement > data.width) note = "will fit snug";
      else if (userMeasurement < data.width - ease) note = "will fit loose";
      return { size, note };
    }
  }

  const [largestSize] = rows[rows.length - 1];
  return { size: largestSize, note: "largest size available — will fit snug" };
}

// Pure client-side size recommendation against the merchant's size chart
// (product.metadata.size_chart). No backend call involved.
const FitCalculator = ({ sizeChart, onSelectSize }) => {
  const [width, setWidth] = useState("");
  const [result, setResult] = useState(null);

  if (!sizeChart?.rows || !Object.keys(sizeChart.rows).length) return null;

  const unit = sizeChart.unit || "in";

  const handleCheck = (e) => {
    e.preventDefault();
    const value = Number(width);
    if (!value || value <= 0) return;
    setResult(recommendSize(sizeChart, value));
  };

  return (
    <div className="mt-3 mb-3 p-3 border rounded">
      <h6 className="mb-2">Find My Size</h6>
      <form onSubmit={handleCheck} className="d-flex align-items-end" style={{ gap: "0.5rem" }}>
        <div className="flex-grow-1">
          <label className="form-label mb-1" style={{ fontSize: "0.85rem" }}>
            Your chest width, side to side ({unit})
          </label>
          <input
            type="number"
            min="1"
            step="0.5"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="form-control"
            placeholder="e.g. 19"
          />
        </div>
        <button type="submit" className="pdp-fit-check-btn">
          Check
        </button>
      </form>

      {result && (
        <div className="mt-2">
          <AlertDismissible
            key={`${result.size}-${result.note}`}
            variant="info"
            message={`Recommended: ${result.size} — ${result.note}`}
          />
          {onSelectSize && (
            <button
              type="button"
              className="pdp-fit-use-size-btn"
              onClick={() => onSelectSize(result.size)}
            >
              Use this size
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FitCalculator;
