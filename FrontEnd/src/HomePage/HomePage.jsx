import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../Components/navigation/Navbar";
import "../style/pattern.css";
import Loading from "../Components/Loading";
import { useData } from "../Context/DataContext";
import SponsersSection from "./Landing/sponsersSection";
import MessagesSection from "./Landing/MessagesSection";
import CityAdv2 from "./Landing/CityAdv2";

const HeroSection = React.lazy(() => import("./Landing/hero/HeroSection"));
const CurrentAdv = React.lazy(() => import("./Landing/CurrentAdv"));
const CityAdv = React.lazy(() => import("./Landing/CityAdv"));
const SocialMediaInfluencers = React.lazy(() =>
  import("./Landing/SocialMediaInfluencers")
);
const DownloadSection = React.lazy(() => import("./Landing/DownloadSection"));
const CampaignStats = React.lazy(() => import("./Landing/CampaignStats"));
const StarsSection = React.lazy(() => import("./Landing/StarsSection"));
const ContactSection = React.lazy(() => import("./Landing/ContactSection"));

const HomePage = () => {
  return <HomePageItems />;
};

const HomePageItems = () => {
  const [data, setData] = useState();
  const [isCurrentAdvLoaded, setIsCurrentAdvLoaded] = useState(false); // 👈 جديد
  const { websiteData } = useData();

  useEffect(() => {
    setData(websiteData);
  }, [websiteData]);

  return (
    <div className="PatternBG" style={{ fontFamily: "Cairo" }}>
      <Navbar />

      <Suspense fallback={<Loading />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <CurrentAdv onLoad={() => setIsCurrentAdvLoaded(true)} />
      </Suspense>

      {isCurrentAdvLoaded && (
        <>
          <Suspense fallback={<Loading />}>
            <CityAdv />
          </Suspense>

          {!data?.hideMainInfo3 && (
            <Suspense fallback={<Loading />}>
              <CityAdv2 />
            </Suspense>
          )}

          



          <Suspense fallback={<Loading />}>
            <CampaignStats />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <StarsSection />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <SocialMediaInfluencers />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <SponsersSection />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <MessagesSection />
          </Suspense>

          {!data?.hideSection && (
            <Suspense fallback={<Loading />}>
              <DownloadSection />
            </Suspense>
          )}

          <Suspense fallback={<Loading />}>
            <ContactSection />
          </Suspense>
        </>
      )}

      <div className="h-[100px]"></div>
    </div>
  );
};

export default HomePage;
