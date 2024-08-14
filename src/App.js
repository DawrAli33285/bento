import logo from './logo.svg';
import './App.css';
import AnnouncmentBanner from './components/AnnouncmentBanner';
import HeroSection from './components/HeroSection';
import VideoBanner from './components/VideoBanner';
import FamiliarFaces from './components/FamiliarFaces';
import HeadingSection from './components/HeadingSection';
import CardSection from './CardsSection';
import Marquee from './components/Marquee';
import OwnLink from './components/OwnLink';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <AnnouncmentBanner />
      <HeroSection />
      <VideoBanner />
      <FamiliarFaces />
      <HeadingSection />
      <CardSection />
      <Marquee />
      <OwnLink />
      <Footer />
    </div>
  );
}

export default App;
