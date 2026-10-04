import "./ServicesSection.css";

/**
 * Services data array.
 * To add a new service, simply append a new object.
 * Properties:
 *  - id: Unique number
 *  - icon: Font Awesome icon class
 *  - title: Friendly, non-technical title (question style)
 *  - description: Plain-English explanation of the service
 *  - benefits: Array of 3 short benefit strings
 *  - color: Unique accent color for hover effects
 */
const servicesData = [
  {
    id: 1,
    icon: "fas fa-code",
    title: "Web Development",
    description:
      "From sleek landing pages to complex full-stack platforms — I build fast, scalable, and beautifully crafted web applications tailored to your goals.",
    benefits: ["React & Node.js", "REST API integration", "Responsive & SEO-ready"],
    color: "#00f5d4",
  },
  {
    id: 2,
    icon: "fab fa-android",
    title: "Android Development",
    description:
      "I craft high-performance Android apps with clean UX that feel native, load fast, and work great across all screen sizes and devices.",
    benefits: ["Native Android (Kotlin)", "Smooth UI/UX", "Play Store deployment"],
    color: "#7b61ff",
  },
  {
    id: 3,
    icon: "fas fa-wand-magic-sparkles",
    title: "AI Features & Integrations",
    description:
      "Integrating LLMs, custom chatbots, automated workflows, and smart search features into existing platforms.",
    benefits: ["Custom chatbots & LLMs", "Automated workflows", "Smart search features"],
    color: "#3b82f6",
  },
  {
    id: 4,
    icon: "fas fa-gauge-high",
    title: "Performance & SEO Audit",
    description:
      "Speed optimization, code refactoring, accessibility enhancements, and search engine positioning.",
    benefits: ["Speed optimization", "Code refactoring", "Search engine ranking"],
    color: "#22c55e",
  }
];


export default function ServicesSection() {
  const handleCTA = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <span className="services-badge">
            <i className="fas fa-concierge-bell"></i> What I Offer
          </span>
          <h2 className="services-title">
            My <span className="gradient-text">Services</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service) => (
            <div
              className="service-card"
              key={service.id}
              style={{ "--service-color": service.color }}
            >
              <div className="service-icon-wrap">
                <i className={service.icon}></i>
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.description}</p>
              <ul className="service-benefits">
                {service.benefits.map((benefit) => (
                  <li key={benefit}>
                    <i className="fas fa-check"></i> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
