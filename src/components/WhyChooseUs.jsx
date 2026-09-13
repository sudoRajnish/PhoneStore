import FeatureCard from "./FeatureCard.jsx";
import "./WhyChooseUs.css";

const features = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description: "Get your new phone delivered to your door in as little as 2 days.",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    description: "Checkout with confidence using encrypted, trusted payment methods.",
  },
  {
    icon: "🛡️",
    title: "Genuine Products",
    description: "Every device is 100% authentic and comes with official warranty.",
  },
  {
    icon: "🎧",
    title: "24/7 Customer Support",
    description: "Our support team is always available to help, day or night.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-us">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Why Nova Mobile</span>
          <h2>Why Choose Us</h2>
        </div>

        <div className="why-us__grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
