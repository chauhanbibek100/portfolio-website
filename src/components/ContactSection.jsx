import { useState, useRef, useEffect } from "react";
import "./ContactSection.css";

const POPULAR_COUNTRIES = [
  { iso: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { iso: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { iso: "US", name: "USA", dialCode: "+1", flag: "🇺🇸" },
  { iso: "GB", name: "UK", dialCode: "+44", flag: "🇬🇧" },
  { iso: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { iso: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { iso: "AE", name: "UAE", dialCode: "+971", flag: "🇦🇪" },
  { iso: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { iso: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
];

const OTHER_COUNTRIES = [
  { iso: "AF", name: "Afghanistan", dialCode: "+93", flag: "🇦🇫" },
  { iso: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { iso: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { iso: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { iso: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { iso: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { iso: "BT", name: "Bhutan", dialCode: "+975", flag: "🇧🇹" },
  { iso: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { iso: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { iso: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { iso: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { iso: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { iso: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { iso: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { iso: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { iso: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { iso: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { iso: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { iso: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { iso: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { iso: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { iso: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { iso: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { iso: "MV", name: "Maldives", dialCode: "+960", flag: "🇲🇻" },
  { iso: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { iso: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { iso: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { iso: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { iso: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { iso: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { iso: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { iso: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { iso: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { iso: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { iso: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { iso: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { iso: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { iso: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { iso: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { iso: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { iso: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { iso: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { iso: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { iso: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { iso: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { iso: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { iso: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
];

const ALL_COUNTRIES = [...POPULAR_COUNTRIES, ...OTHER_COUNTRIES];

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryIso: "IN",
    countryCode: "+91",
    whatsapp: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Custom country dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownPlacement, setDropdownPlacement] = useState("down");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    if (!isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // Intelligently open upwards if space below is limited
      if (spaceBelow < 290 && spaceAbove > spaceBelow) {
        setDropdownPlacement("up");
      } else {
        setDropdownPlacement("down");
      }
      setSearchQuery("");
    }
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectCountry = (country) => {
    setFormData((prev) => ({
      ...prev,
      countryIso: country.iso,
      countryCode: country.dialCode,
    }));
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const filteredCountries = ALL_COUNTRIES.filter((c) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const nameMatch = c.name.toLowerCase().includes(query);
    const isoMatch = c.iso.toLowerCase().includes(query);
    const cleanDialCode = c.dialCode.replace("+", "");
    const cleanQuery = query.replace("+", "");
    const codeMatch =
      c.dialCode.includes(query) || cleanDialCode.startsWith(cleanQuery);
    return nameMatch || isoMatch || codeMatch;
  });

  const currentCountry =
    ALL_COUNTRIES.find((c) => c.iso === formData.countryIso) ||
    POPULAR_COUNTRIES[0];

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

    const trimmedWhatsapp = formData.whatsapp.trim();
    const fullWhatsapp = trimmedWhatsapp
      ? (trimmedWhatsapp.startsWith("+")
          ? trimmedWhatsapp
          : `${formData.countryCode} ${trimmedWhatsapp}`)
      : "";

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        whatsapp: fullWhatsapp,
        message: formData.message,
      };

      let res;
      try {
        res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.status === 404 && window.location.hostname === "localhost") {
          res = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      } catch (networkError) {
        if (window.location.hostname === "localhost") {
          res = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          throw networkError;
        }
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      showToast(
        "success",
        "Message sent successfully!",
      );
      setFormData({
        name: "",
        email: "",
        countryIso: "IN",
        countryCode: "+91",
        whatsapp: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      showToast(
        "error",
        err.message ||
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
                <div className="phone-input-group">
                  <div className="country-selector-wrapper" ref={dropdownRef}>
                    <button
                      type="button"
                      id="contact-country-code"
                      className={`country-selector-btn ${isDropdownOpen ? "active" : ""}`}
                      onClick={toggleDropdown}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      aria-label={`Country code: ${currentCountry.name} ${currentCountry.dialCode}`}
                      title={`${currentCountry.name} (${currentCountry.dialCode})`}
                    >
                      <span className="country-btn-content">
                        <span className="country-btn-flag">{currentCountry.flag}</span>
                        <span className="country-btn-code">{currentCountry.dialCode}</span>
                      </span>
                      <span className={`country-btn-arrow ${isDropdownOpen ? "open" : ""}`}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    {isDropdownOpen && (
                      <div
                        className={`country-dropdown-menu ${
                          dropdownPlacement === "up"
                            ? "dropdown-open-up"
                            : "dropdown-open-down"
                        }`}
                        role="listbox"
                      >
                        <div className="country-search-wrapper">
                          <span className="country-search-icon">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                          </span>
                          <input
                            ref={searchInputRef}
                            type="text"
                            className="country-search-input"
                            placeholder="Search country..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Search country"
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              className="country-search-clear"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery("");
                                if (searchInputRef.current) {
                                  searchInputRef.current.focus();
                                }
                              }}
                              aria-label="Clear search"
                            >
                              ×
                            </button>
                          )}
                        </div>

                        <div className="country-list-scroll">
                          {filteredCountries.length === 0 ? (
                            <div className="no-countries-found">
                              No countries found
                            </div>
                          ) : searchQuery.trim() ? (
                            filteredCountries.map((c) => (
                              <button
                                key={`search-${c.iso}`}
                                type="button"
                                className={`country-option ${
                                  c.iso === formData.countryIso ? "selected" : ""
                                }`}
                                onClick={() => handleSelectCountry(c)}
                                role="option"
                                aria-selected={c.iso === formData.countryIso}
                              >
                                <span className="country-option-flag">{c.flag}</span>
                                <span className="country-option-name">{c.name}</span>
                                <span className="country-option-code">{c.dialCode}</span>
                              </button>
                            ))
                          ) : (
                            <>
                              <div className="country-group-label">Popular</div>
                              {POPULAR_COUNTRIES.map((c) => (
                                <button
                                  key={`pop-${c.iso}`}
                                  type="button"
                                  className={`country-option ${
                                    c.iso === formData.countryIso ? "selected" : ""
                                  }`}
                                  onClick={() => handleSelectCountry(c)}
                                  role="option"
                                  aria-selected={c.iso === formData.countryIso}
                                >
                                  <span className="country-option-flag">{c.flag}</span>
                                  <span className="country-option-name">{c.name}</span>
                                  <span className="country-option-code">{c.dialCode}</span>
                                </button>
                              ))}
                              <div className="country-group-label">All Countries</div>
                              {OTHER_COUNTRIES.map((c) => (
                                <button
                                  key={`all-${c.iso}`}
                                  type="button"
                                  className={`country-option ${
                                    c.iso === formData.countryIso ? "selected" : ""
                                  }`}
                                  onClick={() => handleSelectCountry(c)}
                                  role="option"
                                  aria-selected={c.iso === formData.countryIso}
                                >
                                  <span className="country-option-flag">{c.flag}</span>
                                  <span className="country-option-name">{c.name}</span>
                                  <span className="country-option-code">{c.dialCode}</span>
                                </button>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    id="contact-whatsapp"
                    type="tel"
                    name="whatsapp"
                    placeholder="XXXXX XXXXX"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="phone-number-input"
                  />
                </div>
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
