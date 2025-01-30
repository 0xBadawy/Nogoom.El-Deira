import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const ProfileCard = ({ name, image, area, followers }) => {
  return (
    <div className="flex justify-center items-center p-1">
      <motion.div
        className="w-full max-w-sm bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative hover:shadow-3xl transition-shadow duration-300 flex flex-col min-h-[400px]"
        whileHover={{ scale: 1.05 }}
      >
        {/* Background Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-indigo-300/20 rounded-3xl" />

        {/* Profile Image */}
        <div className="flex justify-center mt-8">
          <motion.img
            src={image}
            alt={`${name}'s profile`}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        {/* Profile Details */}
        <div className="p-6 text-center flex-grow flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
            {name}
          </h2>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-purple-500" />
              <span className="line-clamp-1">{area}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaUsers className="mr-3 text-purple-500" />
              <span className="line-clamp-1">{followers} متابع</span>
            </div>
          </div>
        </div>
        {/* Follow Button */}
{/* 
        <div className="flex justify-center pb-6">
          <motion.button
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Follow
          </motion.button>
        </div> */}

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-indigo-400" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-indigo-400" />
      </motion.div>
    </div>
  );
};

export default ProfileCard;