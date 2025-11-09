import Header from "./components/header";
import HeroSection from "./blocks/hero-section";
import AboutUsSection from "./blocks/about-us-section";
import CTASection from "./blocks/cta-section";
import BlogSection from "./blocks/blog-section";
import FAQSection from "./blocks/faq-section";
import Footer from "./components/footer";
import ContactUsSection from "./blocks/contact-us-section";

export default function HomePage() {
  return (
    <div className="relative">
      <Header />

      <main className="flex flex-col">
        <HeroSection />
        <BlogSection />
        <AboutUsSection />
        <FAQSection />
        <CTASection />
        <ContactUsSection />
      </main>

      <Footer />
    </div>
  );
}
