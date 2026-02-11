import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import WhyChooseSection from './sections/WhyChooseSection';
import SolutionsSection from './sections/SolutionsSection';
import FeaturesSection from './sections/FeaturesSection';
import ProcessSection from './sections/ProcessSection';
import SecuritySection from './sections/SecuritySection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-brand-blue">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <SolutionsSection />
        <FeaturesSection />
        <ProcessSection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
