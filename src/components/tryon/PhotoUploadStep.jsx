import React from "react";

const PhotoUploadStep = ({ onFileSelected }) => {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) onFileSelected(file);
  };

  return (
    <div className="text-center py-4">
      <p className="text-muted mb-3">
        Upload a clear, front-facing photo to preview this jersey on yourself. Your photo is processed
        on your device only — it's never uploaded or stored.
      </p>
      <label className="btn btn-dark mb-0">
        Choose Photo
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleChange}
          className="d-none"
        />
      </label>
    </div>
  );
};

export default PhotoUploadStep;
