import React, { useEffect, useRef, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import PhotoUploadStep from "./PhotoUploadStep";
import TryonCanvas from "./TryonCanvas";
import useTryonPoseDetection from "./useTryonPoseDetection";
import { BASE_URL } from "../../utils/constants";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Entirely client-side: the uploaded photo is read via createObjectURL and
// never sent to the server. Only the merchant's already-public tryon_image
// PNG and the one-time TF.js model weights involve any network request.
const TryonModal = ({ show, onClose, tryonImagePath, productName }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoImage, setPhotoImage] = useState(null);
  const [jerseyImage, setJerseyImage] = useState(null);
  const [keypoints, setKeypoints] = useState(null);
  const [phase, setPhase] = useState("upload"); // upload | detecting | result | error
  const [errorMessage, setErrorMessage] = useState("");
  const canvasRef = useRef(null);
  const { detect } = useTryonPoseDetection();

  useEffect(() => {
    if (show && tryonImagePath && !jerseyImage) {
      loadImage(`${BASE_URL}/${tryonImagePath}`)
        .then(setJerseyImage)
        .catch(() => {
          setPhase("error");
          setErrorMessage("Couldn't load the try-on image for this product.");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, tryonImagePath]);

  const reset = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(null);
    setPhotoImage(null);
    setKeypoints(null);
    setErrorMessage("");
    setPhase("upload");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFileSelected = async (file) => {
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    setPhase("detecting");
    try {
      const img = await loadImage(url);
      setPhotoImage(img);
      const points = await detect(img);
      setKeypoints(points);
      setPhase("result");
    } catch (err) {
      setPhase("error");
      setErrorMessage("Couldn't process that photo. Please try a different one.");
    }
  };

  const handleCanvasResult = ({ ok, reason }) => {
    if (!ok && reason === "low_confidence") {
      setErrorMessage(
        "Couldn't detect your shoulders clearly — try a front-facing photo with your shoulders visible."
      );
    } else {
      setErrorMessage("");
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${productName || "tryon"}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Try It On{productName ? ` — ${productName}` : ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {phase === "upload" && <PhotoUploadStep onFileSelected={handleFileSelected} />}

        {phase === "detecting" && (
          <div className="text-center py-5">
            <Spinner animation="border" />
            <p className="text-muted mt-3">Analyzing your photo…</p>
          </div>
        )}

        {phase === "result" && (
          <div className="text-center">
            <TryonCanvas
              canvasRef={canvasRef}
              photoImage={photoImage}
              jerseyImage={jerseyImage}
              keypoints={keypoints}
              onResult={handleCanvasResult}
            />
            {errorMessage && <p className="text-warning mt-2 mb-0">{errorMessage}</p>}
            <div className="mt-3 d-flex justify-content-center gap-2">
              <button className="btn btn-outline-secondary" onClick={reset}>
                Try Another Photo
              </button>
              <button className="btn btn-dark" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        )}

        {phase === "error" && (
          <div className="text-center py-4">
            <p className="text-danger">{errorMessage || "Something went wrong."}</p>
            <button className="btn btn-outline-secondary" onClick={reset}>
              Try Again
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TryonModal;
