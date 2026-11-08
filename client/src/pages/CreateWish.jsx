
import { useState } from "react";

import "./CreateWish.css";
function CreateWish({ onBack, onCreated }) {
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState(
    "May this Diwali bring endless happiness, prosperity, love and beautiful moments into your life. Happy Diwali!"
  );
  const [template, setTemplate] = useState("royal");
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !senderName.trim() ||
      !recipientName.trim() ||
      !message.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("senderName", senderName.trim());
      formData.append("recipientName", recipientName.trim());
      formData.append("message", message.trim());
      formData.append("template", template);

      if (photo) {
        formData.append("photo", photo);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/greetings`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create greeting."
        );
      }

      if (!data.greetingId) {
        throw new Error("Greeting was created but no ID was returned.");
      }

      onCreated(data.greetingId);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-wish-page">
      <div className="editor-container">
        <button type="button" onClick={onBack}>
          ← Back to Home
        </button>

        <h1>Create Your Diwali Wish ✨</h1>
        <p>Make a beautiful personalized greeting for someone special.</p>

        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
          />

          <label>Recipient Name</label>
          <input
            type="text"
            placeholder="Who are you sending this wish to?"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
          />

          <label>Your Message</label>
          <textarea
            value={message}
            maxLength={240}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
          <small>{message.length}/240 characters</small>

          <label>Upload Your Photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];

              if (!selectedFile) {
                setPhoto(null);
                return;
              }

              if (!selectedFile.type.startsWith("image/")) {
                setError("Please select a valid image.");
                e.target.value = "";
                return;
              }

              if (selectedFile.size > 5 * 1024 * 1024) {
                setError("Image must be smaller than 5 MB.");
                e.target.value = "";
                return;
              }

              setError("");
              setPhoto(selectedFile);
            }}
          />

          {photo && (
            <div>
              <p>Selected photo: {photo.name}</p>
              <button
                type="button"
                onClick={() => setPhoto(null)}
              >
                Remove Photo
              </button>
            </div>
          )}

          <label>Choose Greeting Theme</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="royal">Royal Gold</option>
            <option value="traditional">Traditional</option>
            <option value="midnight">Midnight Magic</option>
          </select>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Your Wish..." : "Create My Diwali Wish ✨"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateWish;
