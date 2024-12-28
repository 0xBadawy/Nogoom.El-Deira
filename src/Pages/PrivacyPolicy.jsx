import React, { useEffect, useState } from "react";
import Navbar from "../Components/navigation/Navbar";
import PrivacyHeader from "./privacy/PrivacyHeader";
import PrivacySection from "./privacy/PrivacySection";
import PrivacyList from "./privacy/PrivacyList";
import PrivacyFooter from "./privacy/PrivacyFooter";
import { privacyContent } from "../data/privacyContent";
import { useDashboard } from "../Context/DashboardContext";

const PrivacyPolicy = () => {

  const [text, setTest] = useState({});
     const [Date, setDate] = useState("");

   const { getPrivacy } = useDashboard();
   useEffect(() => {
     const fetchData = async () => {
       const response = await getPrivacy();
       setTest(response);
       console.log(response);
       setDate(new Date(response.updatedAt.seconds * 1000).toLocaleString());

     };
     fetchData();
   }, []);
  return (
    <div className="min-h-screen bg-gray-50" style={{ direction: "rtl" }}>
      <Navbar color={"black"} />
      <main className="max-w-4xl mx-auto py-32 px-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <PrivacyHeader
            title={"سياسة الخصوصية"}
            description={
              "خصوصيتك مهمة لدينا. تحدد هذه الصفحة كيفية التعامل مع معلوماتك الشخصية بعناية وشفافية واحترام."
            }
          />

          <PrivacyHeader title={""} description={text.privacy} />

          <PrivacyFooter lastUpdated={""} />
          <div className="text-gray-500 text-sm mt-4">
            {text.updatedAt
              ? text.updatedAt.toDate
                ? text.updatedAt.toDate().toLocaleString() // Handle Firestore Timestamp
                : new Date(text.updatedAt.seconds * 1000).toLocaleString() // Handle raw {seconds, nanoseconds}
              : "Unknown Date"}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
