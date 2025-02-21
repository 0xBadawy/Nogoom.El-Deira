import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram, 
  FaSnapchatGhost,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useDashboard } from "../Context/DashboardContext";
import { useNavigate } from "react-router-dom";
import { useData } from "../Context/DataContext";
const ContactPage = () => {
  const [contact, setContact] = useState();
  const { fetchContact } = useDashboard();
  const navigate = useNavigate();

   const [data, setData] = useState();
   const { websiteData } = useData();
 
   useEffect(() => {
     setData(websiteData);
     console.log("websiteData cty ", websiteData);
   }, [websiteData]);
 

  return (
    <main className="relative py-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 lg:px-20">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-900">
          تواصل معنا
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Follow Us Section */}
          <div className="bg-white rounded-2xl shadow-xl  p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              تابعنا
            </h2>
            <div className="flex justify-center gap-3 lg:gap-8">
              <a
                href={data?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-4xl"
                aria-label="فيسبوك"
              >
                <FaFacebookF size={55} />
              </a>
              <a
                href={data?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 text-4xl"
                aria-label="تويتر"
              >
                <FaTwitter size={55} />
              </a>
              <a
                href={data?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 text-4xl"
                aria-label="إنستغرام"
              >
                <FaInstagram size={55} />
              </a>
              <a
                href={data?.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-600 text-4xl"
                aria-label="سناب شات"
              >
                <FaSnapchatGhost size={55} />
              </a>
              <a
                href={data?.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 text-4xl"
                aria-label="تيك توك"
              >
                <FaTiktok size={55} />
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              تواصل معنا
            </h2>
            <div className="space-y-6 text-center">
              <p className="text-lg text-gray-800">
                <FaPhoneAlt className="inline text-blue-600 ml-2" />
                <a href={`tel:${data?.phone}`} className="hover:text-blue-800">
                  {data?.phone}
                </a>
              </p>

              <p className="text-lg text-gray-700">
                <FaEnvelope className="inline text-blue-600 ml-2" />
                <a
                  href={`mailto:${data?.email}`}
                  className="hover:text-blue-800 font-medium"
                >
                  {data?.email}
                </a>
              </p>
              <button
                className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-full shadow-md mx-auto hover:bg-green-600 transition-transform"
                onClick={() => window.open(`https://wa.me/${data?.whatsapp}`)}
              >
                <FaWhatsapp className="text-xl" />
                واتساب
              </button>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
