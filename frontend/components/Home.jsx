import "./Home.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to RoadSafety</h1>
        <p className="tagline">Your Intelligent Road Safety Companion</p>
      </header>

      <section className="intro-section">
        <h2>Creating Safer Roads Through Technology</h2>
        <p className="description">
          We leverage advanced AI and real-time data to prevent accidents, 
          enhance driver awareness, and improve emergency response.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">📍</div>
            <h3>Accident Hotspot Prediction</h3>
            <p>Identify high-risk areas using historical data analysis</p>
          </div>
          <div className="feature-card">
            <div className="icon">📰</div>
            <h3>Real-time Accident News</h3>
            <p>Instant updates through integrated news APIs</p>
          </div>
          <div className="feature-card">
            <div className="icon">🗺️</div>
            <h3>Interactive Accident Map</h3>
            <p>Community-powered accident tracking and reporting</p>
          </div>
          <div className="feature-card">
            <div className="icon">🆘</div>
            <h3>Emergency SOS</h3>
            <p>Instant emergency alerts with location sharing</p>
          </div>
        </div>
      </section>

      <section className="upcoming-features">
        <h2>Coming Soon</h2>
        <div className="feature-list">
          <div className="upcoming-item">
            <span className="badge">AI</span>
            <p>Smart Driver Behavior Analysis</p>
          </div>
          <div className="upcoming-item">
            <span className="badge">CV</span>
            <p>Real-time Speed Limit Enforcement</p>
          </div>
          <div className="upcoming-item">
            <span className="badge">ML</span>
            <p>Accident Injury Prediction System</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Join Our Safety Revolution</h2>
        <p>Help us build safer roads for everyone</p>
        <div className="cta-buttons">
          <Link to="/signup">
            <button className="primary-cta">Get Started</button>
          </Link>
          <Link to="/contact">
            <button className="secondary-cta">Contact Us</button>
            </Link>
        </div>
      </section>
    </div>
  );
}