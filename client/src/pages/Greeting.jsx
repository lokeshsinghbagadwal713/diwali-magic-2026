import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy, MessageCircle, ArrowLeft } from "lucide-react";
import "./Greeting.css";

export default function Greeting() {
  const { id } = useParams();

  const [greeting, setGreeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const shareUrl = window.location.href;

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/greetings/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Greeting not found.");
        }

        setGreeting(data.greeting);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGreeting();
  }, [id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Greeting link copied!");
    } catch {
      alert("Unable to copy. Please copy the link from your browser.");
    }
  };

  const shareWhatsApp = () => {
    const text = `🪔 ${greeting.senderName} has sent you a special Diwali greeting! Open your surprise here: ${shareUrl}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (loading) {
    return <div className="greeting-status">✨ Preparing your Diwali surprise...</div>;
  }

  if (error || !greeting) {
    return (
      <div className="greeting-status">
        <h2>🪔 Greeting not found</h2>
        <p>{error || "This greeting may have expired or does not exist."}</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <main className={`greeting-page template-${greeting.template}`}>
      <motion.div
        className="greeting-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="greeting-stars">✦ ✧ ✦</div>

        <div className="greeting-diya">🪔</div>

        <p className="greeting-eyebrow">A SPECIAL FESTIVAL SURPRISE</p>

        <h1>Happy Diwali!</h1>

        <p className="greeting-recipient">
          Dear <strong>{greeting.recipientName}</strong>
        </p>

        {greeting.photoUrl && (
          <img
            src={greeting.photoUrl}
            alt="Personal Diwali greeting"
            className="greeting-photo"
          />
        )}

        <p className="greeting-message">{greeting.message}</p>

        <div className="greeting-divider">✧ ❋ ✧</div>

        <p className="greeting-sender">
          With love,
          <br />
          <strong>{greeting.senderName}</strong>
        </p>

        <p className="greeting-footer">
          May your life always shine with happiness and prosperity.
        </p>

        <div className="greeting-stars">✦ ✧ ✦</div>
      </motion.div>

      <div className="greeting-actions">
        <button onClick={shareWhatsApp}>
          <MessageCircle size={18} />
          Share on WhatsApp
        </button>

        <button onClick={copyLink}>
          <Copy size={18} />
          Copy Greeting Link
        </button>

        <Link to="/">
          <ArrowLeft size={18} />
          Create Your Own Greeting
        </Link>
      </div>
    </main>
  );
}