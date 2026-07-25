import { useState } from "react";
import "./ContactSection.css";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      showToast(
        "success",
        "Message sent successfully! I'll get back to you soon.",
      );
      setFormData({ name: "", email: "", whatsapp: "", message: "" });
      setErrors({});
    } catch {
      showToast(
        "error",
        "Something went wrong. Please try again or reach out via WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          {/* <p className="contact-subtitle">
            Drop me a message and I&apos;ll get back to you as soon as possible.
          </p> */}
        </div>

        <div className="contact-grid">
          {/* LEFT — Contact Form */}
          <div className="contact-form-card glass-card">
            <div className="form-card-header">
              <span className="form-icon"></span>
              <h3>Send a Message</h3>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name">
                  Name <span className="required-star">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && (
                  <span className="field-error">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">
                  Email <span className="required-star">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-whatsapp">WhatsApp Number</label>
                <input
                  id="contact-whatsapp"
                  type="tel"
                  name="whatsapp"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">
                  Message <span className="required-star">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="3"
                  placeholder="Tell me about your project or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "input-error" : ""}
                />
                {errors.message && (
                  <span className="field-error">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="btn-icon"></span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT — Contact Info & WhatsApp Panel */}
          <div className="contact-right-column">
            <div className="contact-info-panel glass-card">
              <h3 className="info-panel-title">Contact Information</h3>

              <div className="info-list">
                <div className="info-item">
                  <span className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <div className="info-content">
                    <h4>Location</h4>
                    <p>Remote / Worldwide</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>bibekchauhan100@gmail.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">
                    <i className="fab fa-github"></i>
                  </span>
                  <div className="info-content">
                    <h4>GitHub</h4>
                    <p>
                      <a
                        href="https://github.com/chauhanbibek100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github
                      </a>
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">
                    <i className="fab fa-linkedin"></i>
                  </span>
                  <div className="info-content">
                    <h4>LinkedIn</h4>
                    <p>
                      <a
                        href="https://www.linkedin.com/in/bibek-chauhan/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        linkedin
                      </a>
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">
                    <i className="fas fa-clock"></i>
                  </span>
                  <div className="info-content">
                    <h4>Availability</h4>
                    <p>Open to Full-Time, Internships &amp; Freelance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919263953996"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-panel glass-card"
            >
              <div className="wa-panel-icon">
                <i className="fab fa-whatsapp"></i>
              </div>
              <h3 className="wa-panel-title">Start WhatsApp Chat</h3>
              <p className="wa-panel-number">+91 9263953996</p>
              <div className="wa-panel-badge">
                <span className="wa-pulse"></span>
                Usually reply within an hour
              </div>
              <span className="wa-panel-btn">
                Chat Now <span className="card-arrow">→</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`contact-toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? "✅" : "❌"}
          </span>
          <p>{toast.message}</p>
          <button
            className="toast-close"
            onClick={() => setToast(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}

export default ContactSection;
