import React from "react";
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

const ContactSection = () => {
  return (
    <section className="relative py-12 overflow-hidden">

           <div
      className="bg-gradient-to-r from-blue-50 to-green-50 relative w-[95%] py-14 mt-10  rounded-3xl shadow-xl mx-auto flex flex-col md:flex-row items-center gap-10 overflow-hidden"
      style={{  fontFamily: "Cairo" }}
    >
      {/* عناصر تزيينية إضافية */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full opacity-30 animate-bounce-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-200 rounded-full opacity-30 animate-bounce-slow"></div>
      <div className="absolute top-1/3 left-1/3 w-[120%] h-1 bg-gradient-to-r from-blue-300 via-blue-400 to-green-300 transform -rotate-12 opacity-30"></div>

      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          تواصل معنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* قسم تابعنا */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
              تابعنا
            </h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-4xl"
                aria-label="فيسبوك"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 text-4xl"
                aria-label="تويتر"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 text-4xl"
                aria-label="إنستغرام"
              >
                <FaInstagram />
              </a>
              <a
                href="https://snapchat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-600 text-4xl"
                aria-label="سناب شات"
              >
                <FaSnapchatGhost />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 text-4xl"
                aria-label="تيك توك"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* قسم تواصل معنا */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
              تواصل معنا
            </h3>
            <div className="space-y-4 text-center">
              <p className="text-lg text-gray-800">
                <FaPhoneAlt className="inline text-blue-600 mr-2" />
                <a href="tel:+1234567890" className="hover:text-blue-800">
                  +123 456 7890
                </a>
              </p>
              <p className="text-lg text-gray-800">
                <FaEnvelope className="inline text-blue-600 mr-2" />
                <a
                  href="mailto:example@example.com"
                  className="hover:text-blue-800"
                >
                  example@example.com
                </a>
              </p>
              <p className="text-lg text-gray-800">
                <FaWhatsapp className="inline text-green-500 mr-2" />
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-700"
                >
                  واتساب
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ContactSection;
