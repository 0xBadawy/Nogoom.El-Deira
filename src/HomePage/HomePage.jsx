import React from "react";
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



  return (
    <div className="PatternBG" style={{fontFamily:"Cairo"}}>
      <Navbar />
      <HeroSection />
      <CityAdv />
      {/* <DownloadApp /> */}
      <CurrentAdv />
      <SocialMediaInfluencers/>
      <DownloadSection/>
      <CampaignStats/>
      <ContactSection/>
      <div className="h-[1000px]"></div>
    </div>
  );
};

export default HomePage;
