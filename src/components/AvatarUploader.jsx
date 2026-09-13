import { useRef } from "react";
import "./AvatarUploader.css";

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

// Lets the person preview a new profile picture locally (via
// URL.createObjectURL) before saving. There's no real upload endpoint yet —
// a real integration would upload the file separately (or as part of the
// PUT /profile multipart request) and store the returned URL.
function AvatarUploader({ previewUrl, fullName, onChangeFile, onRemove }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onChangeFile(file);
    event.target.value = "";
  };

  return (
    <div className="avatar-uploader">
      <div className="avatar-uploader__preview">
        {previewUrl ? (
          <img src={previewUrl} alt="Profile" />
        ) : (
          <span className="avatar-uploader__initials">{getInitials(fullName || "?")}</span>
        )}
      </div>

      <div className="avatar-uploader__actions">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => fileInputRef.current?.click()}>
          Change Photo
        </button>
        {previewUrl && (
          <button type="button" className="avatar-uploader__remove" onClick={onRemove}>
            Remove
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="avatar-uploader__input"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}

export default AvatarUploader;
