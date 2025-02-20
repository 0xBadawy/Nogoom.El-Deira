import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { storage } from "../../Configuration/Firebase";
import { useDashboard } from "../../Context/DashboardContext";
import { useAuth } from "../../Context/AuthContext";
import AreaGovernmentSelector from "../../Components/AreaGovernmentSelector";
import UserSelector from "../../Components/UserSelector";
import { X } from "lucide-react"; // Import X icon for delete button
import axiosInstance from "../../Configuration/axiosInstance";

const CreateAd = () => {
  // ... (previous state and hooks remain the same)
  const navigate = useNavigate();
  const { addADs } = useDashboard();
  const { getUserEmail } = useAuth();
  const [uploadProgress, setUploadProgress] = useState({ images: 0, video: 0 });
  const [loading, setLoading] = useState(false);
  const [mediaUrls, setMediaUrls] = useState({ images: [], video: "" });
  const [socialLinks, setSocialLinks] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    area: "",
    govern: [],
  });
  const [videoPreview, setVideoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSelectionChange = useCallback(
    ({ selectedArea, selectedGovernments }) => {
      setSelectedAddress((prev) => {
        if (
          prev.area !== selectedArea ||
          JSON.stringify(prev.govern) !== JSON.stringify(selectedGovernments)
        ) {
          return { area: selectedArea, govern: selectedGovernments };
        }
        return prev;
      });
    },
    []
  );

  const validateDates = (startDate, endDate) => {
    return new Date(startDate) <= new Date(endDate);
  };

  const handleImageDelete = (indexToDelete) => {
    setMediaUrls((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleVideoDelete = () => {
    setMediaUrls((prev) => ({ ...prev, video: "" }));
    setVideoPreview(null);
  };
  const handleFileUpload = async (files, type) => {
    if (!files.length) return;

    setLoading(true);
    const validTypes =
      type === "images"
        ? ["image/jpeg", "image/png", "image/gif", "image/webp"]
        : ["video/mp4", "video/webm"];

    const invalidFile = Array.from(files).find(
      (file) => !validTypes.includes(file.type)
    );
    if (invalidFile) {
      toast.error(`نوع الملف غير مدعوم: ${invalidFile.name}`);
      setLoading(false);
      return;
    }

    // Create preview for video
    if (type === "video" && files[0]) {
      const videoURL = URL.createObjectURL(files[0]);
      setVideoPreview(videoURL);
    }

    const uploadPromises = Array.from(files).map((file) => {
      const fileName = "noUser";
      const storageRef = ref(storage, `${fileName}/${type}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress((prev) => ({ ...prev, [type]: progress }));
          },
          reject,
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    });

    try {
      const urls = await Promise.all(uploadPromises);
      setMediaUrls((prev) => ({
        ...prev,
        [type]: type === "images" ? [...prev.images, ...urls] : urls[0],
      }));
    } catch (error) {
      toast.error(`خطأ في رفع الملفات: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLinksChange = (index, value) => {
    setSocialLinks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], link: value };
      return updated;
    });
  };

  const onSubmit = async (data) => {
    if (!validateDates(data.startDate, data.endDate)) {
      toast.error("تاريخ البداية يجب أن يكون قبل تاريخ النهاية");
      return;
    }

    if (!selectedAddress.govern.length) {
      toast.error("يجب اختيار المنطقة");
      return;
    }

    const adData = {
      ...data,
      address: selectedAddress,
      Images: mediaUrls.images.length
        ? mediaUrls.images
        : [
            "https://firebasestorage.googleapis.com/v0/b/default-placeholder-image.jpg",
          ],
      videos: mediaUrls.video,
      views: 0,
      links: socialLinks.filter((link) => link.link?.trim()),
      users: selectedUsers,
    };

    console.log("Ad Data:", adData);
    // return;

    try {
      const response = await axiosInstance.post("/advertisement/add", adData);
      // addADs(response.data);
      console.log(response.data);
      toast.success("تم إضافة الحملة بنجاح");
      // reset();
      // navigate("/dashboard/ads");
    }
    catch (error) {
      toast.error(`خطأ في إضافة الحملة: ${error.message}`);
    }

   
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          إضافة حملة جديدة
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ad Details Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  عنوان الحملة
                </label>
                <input
                  {...register("title", { required: "عنوان الحملة مطلوب" })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  شرح الحملة
                </label>
                <textarea
                  {...register("description", {
                    required: "وصف الحملة مطلوب",
                  })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    تاريخ البداية
                  </label>
                  <input
                    type="date"
                    {...register("startDate", {
                      required: "تاريخ البداية مطلوب",
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    تاريخ النهاية
                  </label>
                  <input
                    type="date"
                    {...register("endDate", {
                      required: "تاريخ النهاية مطلوب",
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  صور الحملة
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e.target.files, "images")
                      }
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      اختر الصور
                    </label>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF حتى 10MB
                    </p>
                  </div>
                </div>

                {/* Image Preview Grid */}
                {mediaUrls.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mediaUrls.images.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageDelete(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadProgress.images > 0 && uploadProgress.images < 100 && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${uploadProgress.images}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  فيديو الحملة
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        handleFileUpload(e.target.files, "video")
                      }
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      اختر الفيديو
                    </label>
                    <p className="text-xs text-gray-500">MP4, WebM حتى 100MB</p>
                  </div>
                </div>

                {/* Video Preview */}
                {(videoPreview || mediaUrls.video) && (
                  <div className="mt-4 relative group">
                    <video
                      controls
                      className="w-full max-h-64 rounded-lg"
                      src={videoPreview || mediaUrls.video}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <button
                      type="button"
                      onClick={handleVideoDelete}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {uploadProgress.video > 0 && uploadProgress.video < 100 && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${uploadProgress.video}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Area Selection & Social Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <AreaGovernmentSelector
                onSelectionChange={handleSelectionChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-4">
                روابط التواصل الاجتماعي
              </label>
              {socialLinks.map((link, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="url"
                    value={link.link || ""}
                    onChange={(e) =>
                      handleSocialLinksChange(index, e.target.value)
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                    placeholder="أدخل رابط التواصل الاجتماعي"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSocialLinks([...socialLinks, { link: "" }])}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                إضافة رابط جديد
              </button>
            </div>
          </div>

          {/* User Selection */}
          <div className="mt-8">
            <UserSelector
              initialSelectedUsers={[]}
              onSelectionChange={setSelectedUsers}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "جاري الإضافة..." : "إضافة الحملة"}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default CreateAd;
