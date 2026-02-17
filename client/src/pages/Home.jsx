import { Navbar } from "../components/home/Navbar";
import { Hero } from "../components/home/Hero";
import { Features } from "../components/home/Features";
import { HowItWorks } from "../components/home/HowItWorks";
import { Pricing } from "../components/home/Pricing";
import { GoogleDriveIntegration } from "../components/home/GoogleDriveIntegration";
import { Footer } from "../components/home/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <GoogleDriveIntegration />
      <Footer />
    </>
  );
}

export default Home;
