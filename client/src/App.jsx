
import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
  Heart,
  Gift,
  Share2,
  Menu
} from "lucide-react";

import CreateWish from "./pages/CreateWish";
import Greeting from "./pages/Greeting";

// Floating particle configuration
const particles = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i % 9) * 0.7}s`,
  duration: `${5 + (i % 6)}s`,
  size: `${3 + (i % 4)}px`
}));

// Animated Diya Component
function Diya({ className = "" }) {
  return (
    <motion.div
      className={`diya ${className}`}
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="flame">
        <div className="flame-inner" />
      </div>

      <div className="wick" />
      <div className="diya-bowl" />
      <div className="diya-base" />
      <div className="diya-glow" />
    </motion.div>
  );
}

// Navigation Bar
function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <a
        href="/"
        className="brand"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <span className="brand-icon">✦</span>
        Diwali<span>Magic</span>
        <small>2026</small>
      </a>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#magic">Experience</a>
        <a href="#about">About</a>
      </div>

      <button
        className="nav-button"
        onClick={() => navigate("/create")}
      >
        Create Wish <Sparkles size={15} />
      </button>

      <button
        className="mobile-menu"
        onClick={() =>
          document.querySelector(".nav-links")?.classList.toggle("show")
        }
        aria-label="Toggle navigation"
      >
        <Menu />
      </button>
    </nav>
  );
}

// Hero Section
function Hero() {
  const explore = () => {
    document.getElementById("magic")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const navigate = useNavigate();

  return (
    <section className="hero" id="home">
      <div className="hero-overlay" />

      <div className="hero-content">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Sparkles size={14} />
          THE FESTIVAL OF LIGHTS
          <Sparkles size={14} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Let Your Life
          <br />
          <span>Shine Brighter</span>
        </motion.h1>

        <motion.div
          className="ornament"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <span>✧</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Happy Diwali 2026
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          This Diwali, don't just send wishes.
          <br />
          Create a magical moment and share happiness
          <br />
          with everyone you love.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <button
            className="primary-button"
            onClick={() => navigate("/create")}
          >
            Create Your Surprise
            <ArrowRight size={17} />
          </button>

          <button
            className="secondary-button"
            onClick={explore}
          >
            Explore Magic
          </button>
        </motion.div>

        <div className="hero-bottom-text">
          ✨ A little light. A lot of happiness. Endless memories. ✨
        </div>
      </div>

      <Diya className="hero-diya left-diya" />
      <Diya className="hero-diya right-diya" />

      <div className="scroll-indicator">
        <span />
        Scroll to explore
      </div>
    </section>
  );
}

// Floating Particles
function FloatingParticles() {
  return (
    <div className="particles">
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size
          }}
        />
      ))}
    </div>
  );
}

// Magic Features Section
function MagicSection() {
  const features = [
    {
      icon: <Gift />,
      title: "A Personal Surprise",
      text: "Create a beautiful personalized Diwali greeting with your name and photo."
    },
    {
      icon: <Sparkles />,
      title: "Magical Experience",
      text: "Beautiful animations, glowing diyas and an unforgettable surprise reveal."
    },
    {
      icon: <Share2 />,
      title: "Spread Happiness",
      text: "Share your unique greeting link with friends, family and everyone."
    }
  ];

  return (
    <section className="magic-section" id="magic">
      <div className="section-heading">
        <span className="section-tag">THE MAGIC OF GIVING</span>

        <h2>
          Make This Diwali
          <br />
          <span>Unforgettable</span>
        </h2>

        <p>
          Happiness becomes more beautiful when it is shared.
          Let's make someone's Diwali special.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <motion.div
            className="feature-card"
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Create Greeting CTA
function CreateSection({ onCreate }) {
  return (
    <section className="create-section" id="create">
      <div className="create-card">
        <Diya className="create-diya" />

        <span className="section-tag">
          SPREAD THE LIGHT
        </span>

        <h2>
          Your Wishes.
          <br />
          <span>Your Memories.</span>
        </h2>

        <p>
          Make a special Diwali greeting for someone you love.
          One photo, one beautiful message, endless smiles.
        </p>

        <button
          className="primary-button"
          onClick={onCreate}
        >
          Start Creating
          <ArrowRight size={17} />
        </button>

        <div className="create-decoration">
          ✧ ❋ ✧
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer-brand">
        ✦ DiwaliMagic 2026
      </div>

      <p>
        Made with <Heart size={13} fill="currentColor" /> to spread happiness.
      </p>

      <span>
        May your life always shine with light.
      </span>
    </footer>
  );
}

// Main Application with Routes
export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <main>
            <FloatingParticles />
            <Navbar />
            <Hero />
            <MagicSection />

            <CreateSection
              onCreate={() => navigate("/create")}
            />

            <Footer />
          </main>
        }
      />

      {/* CREATE GREETING PAGE */}
      <Route
        path="/create"
        element={
          <CreateWish
            onBack={() => navigate("/")}
            onCreated={(id) => navigate(`/wish/${id}`)}
          />
        }
      />

      {/* PERSONALIZED GREETING PAGE */}
      <Route
        path="/wish/:id"
        element={<Greeting />}
      />

      {/* NOT FOUND PAGE */}
      <Route
        path="*"
        element={
          <div className="greeting-status">
            <h2>404 – Page Not Found</h2>
            <button
              className="primary-button"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        }
      />
    </Routes>
  );
}
