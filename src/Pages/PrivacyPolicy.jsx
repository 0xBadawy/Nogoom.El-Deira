import React from "react";
import Navbar from "../Components/navigation/Navbar";
import PrivacyHeader from "./privacy/PrivacyHeader";
import PrivacySection from "./privacy/PrivacySection";
import PrivacyList from "./privacy/PrivacyList";
import PrivacyFooter from "./privacy/PrivacyFooter";
import { privacyContent } from "../data/privacyContent";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar color={"black"} />
      <main className="max-w-4xl mx-auto py-32 px-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <PrivacyHeader
            title={privacyContent.header.title}
            description={privacyContent.header.description}
          />

          <PrivacySection title={privacyContent.dataCollection.title}>
            <PrivacyList items={privacyContent.dataCollection.items} />
          </PrivacySection>

          <PrivacySection title={privacyContent.dataUsage.title}>
            <PrivacyList items={privacyContent.dataUsage.items} />
          </PrivacySection>

          <PrivacySection title={privacyContent.dataProtection.title}>
            <PrivacyList items={privacyContent.dataProtection.items} />
          </PrivacySection>

          <PrivacyFooter lastUpdated="29 نوفمبر 2024" />
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
