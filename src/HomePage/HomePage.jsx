import React, { useEffect } from "react";
import HeroSection from "./Landing/hero/HeroSection";
import Navbar from "../Components/navigation/Navbar";
import DownloadApp from "./Landing/DownloadApp";
import CurrentAdv from "./Landing/CurrentAdv";
import CityAdv from "./Landing/CityAdv";
import "../style/pattern.css";
import SocialMediaInfluencers from "./Landing/SocialMediaInfluencers";
import DownloadSection from "./Landing/DownloadSection";
import CampaignStats from "./Landing/CampaignStats";
import ContactSection from "./Landing/ContactSection";
const HomePage = () => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     window.scrollBy({
  //       top: 1, // Adjust the speed of scrolling
  //       behavior: "smooth",
  //     });
  //   }, 20); // Adjust the interval time (in ms)

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);

  return (
    <div className="PatternBG" style={{ fontFamily: "Cairo" }}>
      <Navbar />
      <HeroSection />
      <CityAdv />
      {/* <DownloadApp /> */}
      <CurrentAdv />
      <SocialMediaInfluencers />
      <DownloadSection />
      <CampaignStats />
      <ContactSection />
      <div className="h-[100px]"></div>
    </div>
  );
};

export default HomePage;
