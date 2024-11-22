import React from "react";
import HeroSection from "./Landing/HeroSection";
import Navbar from "../Components/NavBar/Navbar";
import DownloadApp from "./Landing/DownloadApp";

const HomePage = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && <Navbar />}
      <HeroSection />
      <DownloadApp />
      <div className="h-[1000px]"></div>
    </div>
  );
};

export default HomePage;
