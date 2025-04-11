import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ClipboardCopy,
  ArrowLeft,
  Share2,
  Star,
  Rocket,
  Calendar,
  MapPin,
  Users,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Film,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../Configuration/axiosInstance";
import { toast } from "sonner";

const AdDetailPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axiosInstance.get(`/advertisement/get_one/${id}`);
      const ad = response.data.advertisement;
      setAd(ad);
    };
    fetchAds();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === (ad?.Images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? (ad?.Images?.length || 0) - 1 : prev - 1
    );
  };

  const handleDownloadAll = async () => {
    if (!ad) return;

    // Download images
    for (let i = 0; i < ad.Images?.length; i++) {
      const imageUrl = ad.Images[i];
      try {
        // Fetch the image as a Blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Create a downloadable link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `image_${i + 1}.jpg`; // Customize the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the object URL to free up memory
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error(`Failed to download image ${i + 1}:`, error);
        toast.error(`فشل تنزيل الصورة ${i + 1}`);
      }
    }

    // Download videos (if applicable)
    if (ad.videos) {
      try {
        const videoUrl = ad.videos;
        const response = await fetch(videoUrl);
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `video.mp4`; // Customize the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error("Failed to download video:", error);
        toast.error("فشل تنزيل الفيديو");
      }
    }

    toast.success("تم بدء تنزيل جميع الصور والفيديوهات");
  };

  // New function to download only the video
  const handleDownloadVideo = async () => {
    if (!ad || !ad.videos) {
      toast.error("لا يوجد فيديو متاح للتنزيل");
      return;
    }

    try {
      const videoUrl = ad.videos;
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `video_${ad.title}.mp4`; // Customize the filename with ad title
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
      toast.success("تم بدء تنزيل الفيديو");
    } catch (error) {
      console.error("Failed to download video:", error);
      toast.error("فشل تنزيل الفيديو");
    }
  };

  const AdLinks = ({ links }) => {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (link, index) => {
      navigator.clipboard.writeText(link);
      setCopiedIndex(index);
      toast.success("تم نسخ الرابط بنجاح");
      setTimeout(() => setCopiedIndex(null), 1000);
    };

    return (
      links?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center text-purple-900">
            <LinkIcon className="mr-3 h-5 w-5 text-purple-600" />
            روابط الإعلان
          </h2>
          <div className="space-y-3">
            {links.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={link.link}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-2xl bg-white/50 border-2 border-purple-100 text-gray-700 focus:ring-2 focus:ring-purple-400 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(link.link, index)}
                  className={`p-3 rounded-2xl transition-all ${
                    copiedIndex === index
                      ? "bg-blue-950"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600"
                  } text-white shadow-lg hover:shadow-xl`}
                >
                  <ClipboardCopy className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    );
  };

  if (!ad) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative flex gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isExpired = new Date(ad.endDate) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 text-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 blur-3xl opacity-10"></div>
          <div className="relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-6 sm:p-8">
              <div className="flex justify-between items-center">
                <Link
                  to="/profile"
                  className="text-white/90 hover:text-white transition-all"
                >
                  <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                    <ArrowLeft className="h-6 w-6" />
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="text-white/90 hover:text-white transition-all bg-white/10 p-2 rounded-xl"
                >
                  <Share2 className="h-6 w-6" />
                </motion.button>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-bold mt-6 text-white flex items-center gap-3"
              >
                <Rocket className="h-8 w-8" />
                {ad.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-2 mt-4"
              >
                <span
                  className={`px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                    isExpired
                      ? "bg-red-500/20 text-red-100"
                      : "bg-green-500/20 text-green-100"
                  }`}
                >
                  {isExpired ? "الإعلان منتهي" : "الإعلان مستمر"}
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Images Section */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    {ad.Images && ad.Images.length > 0 ? (
                      <motion.div
                        key="images"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                          <motion.img
                            key={activeImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            src={ad.Images[activeImageIndex]}
                            alt={`${ad.title} - ${activeImageIndex + 1}`}
                            className="w-full h-[500px] object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-x-0 bottom-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-lg font-semibold">
                              {`صورة ${activeImageIndex + 1} من ${
                                ad.Images.length
                              }`}
                            </p>
                          </div>
                          {ad.Images.length > 1 && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all"
                              >
                                <ChevronLeft className="h-6 w-6" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all"
                              >
                                <ChevronRight className="h-6 w-6" />
                              </motion.button>
                            </>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          {ad.Images.map((image, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setActiveImageIndex(index)}
                              className={`relative rounded-2xl overflow-hidden ${
                                activeImageIndex === index
                                  ? "ring-2 ring-purple-600 ring-offset-2"
                                  : ""
                              }`}
                            >
                              <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-20 object-cover"
                              />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-3xl overflow-hidden shadow-2xl"
                      >
                        <img
                          src="/placeholder.svg"
                          alt="صورة غير متوفرة"
                          className="w-full h-[500px] object-cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {ad.videos && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-3xl overflow-hidden shadow-2xl relative group"
                    >
                      <video
                        controls
                        className="w-full"
                        style={{ borderRadius: "1.5rem" }}
                      >
                        <source src={ad.videos} type="video/mp4" />
                        متصفحك لا يدعم وسم الفيديو.
                      </video>

                      {/* Video download button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadVideo}
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all shadow-lg"
                      >
                        <Download className="h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Download Buttons */}
                  <div className="flex gap-4">
                    {/* Download All Button */}
                    {/* <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownloadAll}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Download className="h-5 w-5" />
                      <span>تنزيل الكل</span>
                    </motion.button> */}

                    {/* Download Video Button (Only shown if video exists) */}
                    {ad.videos && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadVideo}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <Film className="h-5 w-5" />
                        <span> اضغط للتنزيل </span>
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-lg"
                  >
                    <p className="text-xl text-gray-700 leading-relaxed">
                      {ad.description}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20"
                    >
                      <div className="flex items-center gap-3 text-purple-900">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold">تاريخ الإطلاق</span>
                      </div>
                      <p className="mt-2 text-gray-700">
                        {new Date(ad.startDate).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20"
                    >
                      <div className="flex items-center gap-3 text-purple-900">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold">تاريخ الانتهاء</span>
                      </div>
                      <p className="mt-2 text-gray-700">
                        {new Date(ad.endDate).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20"
                  >
                    <div className="flex items-center gap-3 text-purple-900 mb-4">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <h2 className="text-xl font-bold">المنطقة والمحافظات</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium">
                          المنطقة:
                        </span>
                        <span className="bg-purple-100 text-purple-900 px-4 py-1.5 rounded-full">
                          {ad.address.area}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">
                          المحافظات:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {ad.address.govern?.map((region, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-purple-100 text-purple-900 px-4 py-1.5 rounded-full text-sm"
                            >
                              {region}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {ad.links?.length > 0 && <AdLinks links={ad.links} />}

                  {ad.stars?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20"
                    >
                      <div className="flex items-center gap-3 text-purple-900 mb-4">
                        <Users className="h-5 w-5 text-purple-600" />
                        <h2 className="text-xl font-bold">النجوم المشاركين</h2>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {ad.stars.map((star, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 bg-white/50 p-4 rounded-xl hover:bg-white/70 transition-colors"
                          >
                            <Star className="h-5 w-5 text-yellow-500" />
                            <span className="text-gray-700 font-medium">
                              {star.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdDetailPage;
