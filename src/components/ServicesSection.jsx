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
    icon: "fas fa-globe",
    title: "Want a Website?",
    description:
      "I'll design and build a stunning website that looks great on phones, tablets, and desktops.",
    benefits: ["Fast loading speed", "Works on all devices", "Easy to update"],
    color: "#f472b6",
  },
  {
    id: 4,
    icon: "fas fa-shopping-bag",
    title: "Need an Online Store?",
    description:
      "Sell your products online with a secure, easy-to-use shop your customers will love.",
    benefits: ["Secure payments", "Product management", "Order tracking"],
    color: "#fb923c",
  },
  {
    id: 5,
    icon: "fas fa-lightbulb",
    title: "Got a Business Idea?",
    description:
      "Turn your idea into a real working app — from concept to launch, I handle everything.",
    benefits: ["Idea to launch", "Custom features", "Growth-ready"],
    color: "#3b82f6",
  },
  {
    id: 6,
    icon: "fas fa-headset",
    title: "Ongoing Support?",
    description:
      "Don't worry about tech stuff — I'll keep your site updated, secure, and running smoothly.",
    benefits: ["Regular updates", "Bug fixes", "24/7 monitoring"],
    color: "#22c55e",
  },
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

        {/* CTA Banner */}
        <div className="services-cta">
          <div className="cta-content">
            <h3 className="cta-heading">Have something else in mind?</h3>
            <p className="cta-text">
              Tell me about your project — I'd love to help bring your idea to
              life.
            </p>
          </div>
          <button className="cta-button" onClick={handleCTA}>
            Let's Talk <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
