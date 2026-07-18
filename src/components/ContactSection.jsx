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
      const res = await fetch("http://localhost:5000/api/contact", {
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
          <p className="contact-subtitle">
            Drop me a message and I&apos;ll get back to you as soon as possible.
          </p>
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
                  rows="5"
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="20"
                      height="20"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <div className="info-content">
                    <h4>Location</h4>
                    <p>Remote / Worldwide</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="20"
                      height="20"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>bibekchauhan100@gmail.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="20"
                      height="20"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="20"
                      height="20"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="20"
                      height="20"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
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
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="32"
                  height="32"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
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
