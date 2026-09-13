import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import BrandSection from "../components/BrandSection.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import SpecialOffer from "../components/SpecialOffer.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrandSection />
        <FeaturedProducts />
        <SpecialOffer />
        <WhyChooseUs />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

export default Home;
