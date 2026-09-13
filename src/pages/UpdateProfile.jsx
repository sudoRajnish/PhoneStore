import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import TextField from "../components/TextField.jsx";
import TextAreaField from "../components/TextAreaField.jsx";
import AvatarUploader from "../components/AvatarUploader.jsx";
import { fetchProfile, updateProfile } from "../utils/profile.js";
import { isValidEmail, isValidPhone, isValidPinCode } from "../utils/validators.js";
import "./UpdateProfile.css";

function validateProfile(data) {
  const errors = {};

  if (!data.fullName.trim()) errors.fullName = "Full name is required.";

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!data.address.trim()) errors.address = "Address is required.";
  if (!data.city.trim()) errors.city = "City is required.";
  if (!data.state.trim()) errors.state = "State is required.";

  if (!data.pinCode.trim()) {
    errors.pinCode = "PIN code is required.";
  } else if (!isValidPinCode(data.pinCode)) {
    errors.pinCode = "Enter a valid PIN code.";
  }

  return errors;
}

function revokeIfBlob(url) {
  if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
}

function UpdateProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedProfile, setSavedProfile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Simulates GET /profile — swap fetchProfile()'s internals for a real
  // call later; this effect doesn't need to change.
  useEffect(() => {
    let isMounted = true;
    fetchProfile().then((data) => {
      if (!isMounted) return;
      setSavedProfile(data);
      setFormData(data);
      setAvatarPreviewUrl(data.avatarUrl);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleAvatarChange = (file) => {
    revokeIfBlob(avatarPreviewUrl);
    setAvatarPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = () => {
    revokeIfBlob(avatarPreviewUrl);
    setAvatarPreviewUrl(null);
  };

  const handleCancel = () => {
    revokeIfBlob(avatarPreviewUrl);
    setFormData(savedProfile);
    setAvatarPreviewUrl(savedProfile.avatarUrl);
    setErrors({});
    setMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSaving) return;

    const validationErrors = validateProfile(formData);
    setErrors(validationErrors);
    setMessage(null);

    if (Object.keys(validationErrors).length > 0) {
      setMessage({ type: "error", text: "Please fix the errors below before saving." });
      return;
    }

    setIsSaving(true);
    try {
      // A real PUT /profile would also handle uploading a new avatar file
      // (multipart, or a separate /profile/avatar endpoint) and return its
      // final URL — for now the locally-previewed avatar just isn't
      // persisted anywhere.
      const result = await updateProfile(formData);
      setSavedProfile({ ...result, avatarUrl: avatarPreviewUrl });
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Something went wrong. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="update-profile">
          <div className="container update-profile__loading">
            <span className="update-profile__spinner" aria-hidden="true" />
            <p>Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="update-profile">
        <div className="container update-profile__container">
          <div className="update-profile__heading">
            <h1>Update Profile</h1>
            <p>Manage your personal information and delivery details.</p>
          </div>

          <form className="update-profile__card" onSubmit={handleSubmit} noValidate>
            <AvatarUploader
              previewUrl={avatarPreviewUrl}
              fullName={formData.fullName}
              onChangeFile={handleAvatarChange}
              onRemove={handleRemoveAvatar}
            />

            <div className="update-profile__grid update-profile__grid--2">
              <TextField
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange("fullName")}
                error={errors.fullName}
                autoComplete="name"
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                error={errors.email}
                autoComplete="email"
              />
            </div>

            <TextField
              id="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange("phone")}
              error={errors.phone}
              autoComplete="tel"
            />

            <TextAreaField
              id="address"
              label="Address"
              value={formData.address}
              onChange={handleChange("address")}
              error={errors.address}
              rows={2}
            />

            <div className="update-profile__grid update-profile__grid--3">
              <TextField
                id="city"
                label="City"
                value={formData.city}
                onChange={handleChange("city")}
                error={errors.city}
                autoComplete="address-level2"
              />
              <TextField
                id="state"
                label="State"
                value={formData.state}
                onChange={handleChange("state")}
                error={errors.state}
                autoComplete="address-level1"
              />
              <TextField
                id="pinCode"
                label="PIN Code"
                value={formData.pinCode}
                onChange={handleChange("pinCode")}
                error={errors.pinCode}
                autoComplete="postal-code"
              />
            </div>

            {message && (
              <p className={`update-profile__message update-profile__message--${message.type}`} role="status">
                {message.text}
              </p>
            )}

            <div className="update-profile__actions">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving && <span className="update-profile__btn-spinner" aria-hidden="true" />}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UpdateProfile;
