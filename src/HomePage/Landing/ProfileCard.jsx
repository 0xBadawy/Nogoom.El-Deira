'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaSnapchat, FaTiktok, FaYoutube, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const ProfileCard = ({
  name,
  image,
  bio,
  area,
  followers,
  facebook,
  instagram,
  snapchat,
  tiktok,
  twitter,
  youtube,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const socialLinks = [
    { platform: 'facebook', url: facebook, icon: <FaFacebook /> },
    { platform: 'twitter', url: twitter, icon: <FaTwitter /> },
    { platform: 'instagram', url: instagram, icon: <FaInstagram /> },
    { platform: 'snapchat', url: snapchat, icon: <FaSnapchat /> },
    { platform: 'tiktok', url: tiktok, icon: <FaTiktok /> },
    { platform: 'youtube', url: youtube, icon: <FaYoutube /> },
  ];

  return (
    <div className="perspective w-full max-w-sm mx-auto">
      <motion.div 
        className="w-full h-[400px] relative [transform-style:preserve-3d] transition-all duration-100 "
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/*      */}
<div className="absolute inset-0 p-5 bg-gradient-to-bl from-purple-400 via-violet-50 to-purple-300 rounded-2xl shadow-xl overflow-hidden [backface-visibility:hidden]">
          <img className="w-64 mx-auto h-64 mt-3 object-cover rounded-full shadow-md border-4 border-white " src={image} alt={`${name}'s profile`} />
          <div className="absolute inset-0 text-primary" />
          <div className="absolute bottom-0 left-0 right-0 py-8 px-2 text-white">
            <h2 className="text-2xl text-center mb-4 font-bold  text-primary">{name}</h2>
            {/* <p className="text-sm mb-4 line-clamp-2 text-primary">{bio}</p> */}
            <div className="flex items-center justify-between">
              <span className="flex items-center text-primary">
                <FaMapMarkerAlt className="mr-2" />
                {area}
              </span>
              <span className="flex items-center text-primary">
                <FaUsers className="ml-2" />
                {followers}
              </span>
            </div>
          </div>
        </div>
          {/*
           <button 
            onClick={() => setIsFlipped(true)}
            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button> 
          */}

        {/* Back of the card */}
        {/* <div className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">تواصل مع {name}</h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((link, index) =>
                  link.url ? (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                    >
                      <span className="text-3xl text-gray-700 mb-2">{link.icon}</span>
                      <span className="text-sm text-gray-600 capitalize">{link.platform}</span>
                    </a>
                  ) : null
                )}
              </div>
            </div>
            <button 
              onClick={() => setIsFlipped(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              Back to Profile
            </button>
          </div>
        </div> */}




      </motion.div>
    </div>
  );
};

export default ProfileCard;

