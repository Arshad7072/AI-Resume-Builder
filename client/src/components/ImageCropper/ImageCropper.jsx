import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import "./ImageCropper.css";

import { getCroppedImg } from "./cropImage";

const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedFile = await getCroppedImg(image, croppedAreaPixels);

      onCropComplete(croppedFile);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cropper-overlay">
      <div className="cropper-modal">
        <h2>Crop Profile Photo</h2>

        <div className="cropper-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div className="zoom-section">
          <span>Zoom</span>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        <div className="cropper-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="save-btn" onClick={handleSave}>
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
