import React, { Suspense } from "react";
import Navbar from "../Components/navigation/Navbar";
import "../style/pattern.css";
import Loading from "../Components/Loading";

const HeroSection = React.lazy(() => import("./Landing/hero/HeroSection"));
const CurrentAdv = React.lazy(() => import("./Landing/CurrentAdv"));
const CityAdv = React.lazy(() => import("./Landing/CityAdv"));
const SocialMediaInfluencers = React.lazy(() =>
  import("./Landing/SocialMediaInfluencers")
);
const DownloadSection = React.lazy(() => import("./Landing/DownloadSection"));
const CampaignStats = React.lazy(() => import("./Landing/CampaignStats"));
const ContactSection = React.lazy(() => import("./Landing/ContactSection"));

const HomePage = () => {
  return (
    <div className="PatternBG" style={{ fontFamily: "Cairo" }}>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CityAdv />
      </Suspense>
      {/* Uncomment when needed */}
      {/* 
      <Suspense fallback={<div>Loading Download App Section...</div>}>
        <DownloadApp />
      </Suspense> 
      */}
      <Suspense fallback={<Loading />}>
        <CurrentAdv />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <SocialMediaInfluencers />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DownloadSection />
      </Suspense>
      <Suspense fallback={<Loading/> }>
        <CampaignStats />
      </Suspense>
      <Suspense fallback={<Loading/> }>
        <ContactSection />
      </Suspense>
      <div className="h-[100px]"></div>
    </div>
  );
};

export default HomePage;
