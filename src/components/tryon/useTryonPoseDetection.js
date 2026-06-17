import { useCallback, useState } from "react";

// Lazily loaded so the ~few-MB TF.js + MoveNet weights are only fetched
// when a shopper actually opens the try-on modal, not on every page load.
let detectorPromise = null;

async function loadDetector() {
  if (!detectorPromise) {
    detectorPromise = (async () => {
      const tf = await import("@tensorflow/tfjs-core");
      await import("@tensorflow/tfjs-converter");
      await import("@tensorflow/tfjs-backend-webgl");
      await tf.setBackend("webgl");
      await tf.ready();
      const poseDetection = await import("@tensorflow-models/pose-detection");
      return poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      });
    })().catch((err) => {
      detectorPromise = null; // allow retry on next call
      throw err;
    });
  }
  return detectorPromise;
}

// Runs entirely in the browser (WebGL) — the photo never leaves the device.
export default function useTryonPoseDetection() {
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [error, setError] = useState(null);

  const detect = useCallback(async (imageElement) => {
    setStatus("loading");
    setError(null);
    try {
      const detector = await loadDetector();
      const poses = await detector.estimatePoses(imageElement, { flipHorizontal: false });
      setStatus("ready");
      return poses?.[0]?.keypoints || [];
    } catch (err) {
      setStatus("error");
      setError(err);
      throw err;
    }
  }, []);

  return { detect, status, error };
}
