import {
  FaStar,
  FaRegStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaVideo,
  FaImage,
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { useDashboard } from "../../Context/DashboardContext";
import { AdEditModal } from "./AdEditModal";
import { useEffect, useState } from "react";
import axiosInstance from "../../Configuration/axiosInstance";
import formatDate from "../../hooks/formatDate";
import { FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const AdDetails = ({ ads, selected }) => {
  const [ad, setAds] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          `/advertisement/get_one/${selected}`
        );
        setAds(response.data.advertisement);
        console.log(
          "response.data.advertisement ",
          response.data.advertisement
        );
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      }
    };

    fetchUserData();
  }, [selected]);

  useEffect(() => {
    console.log("ad", ad);
  }, [ad]);

  const handleDeleteAd = async () => {
    const confirm = window.confirm("هل أنت متأكد من حذف الإعلان؟");
    if (!confirm) return;

    try {
      const response = await axiosInstance.delete(
        `/advertisement/delete/${selected}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("تم حذف الإعلان بنجاح");
        // reload the page
        window.location.reload();
      }
    } catch (error) {
      console.error("حدث خطأ أثناء حذف الإعلان:", error);
      toast.error("حدث خطأ أثناء حذف الإعلان");
    }
  };

  return (
    <Card className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-full mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl sm:text-3xl font-bold">
          {ad?.title}
        </CardTitle>
        <Badge variant="secondary" className="mt-2">
          {/* {translateToArabic(ad.category)} */}
        </Badge>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6">
          {ad?.description}
        </p>
        <Separator className="my-6" />
        <div className="space-y-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <FaCalendarAlt className="text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                تاريخ البداية
              </p>
              <p className="text-base font-semibold">
                {formatDate(ad?.startDate)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                تاريخ النهاية
              </p>
              <p className="text-base font-semibold">
                {formatDate(ad?.endDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <FaMapMarkerAlt className="text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                المنطقة
              </p>
              <p className="text-base font-semibold">{ad?.address.area}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              المحافظات
            </p>
            <div className="flex flex-wrap gap-2">
              {ad?.address.govern?.length > 0 ? (
                ad?.address.govern.map((gov, index) => (
                  <Badge key={index} variant="outline">
                    {gov}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  لم يتم تحديد محافظات
                </span>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold my-8">النجوم المشاركين</h2>
            <div className="space-y-6">
              {/* Display users with links */}
              {ad?.users
                ?.filter((user) => user?.links?.length > 0)
                .map((user, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                  >
                    {/* User Info */}
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <FaStar
                          className="text-yellow-500 text-2xl"
                          title={user?.userId?.name}
                        />
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {user?.userId?.name}
                      </p>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-wrap gap-4">
                      {user?.links?.map((link, i) => (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md truncate max-w-[220px]"
                        >
                          <span className="truncate">
                            {link.length > 25
                              ? `${link.slice(0, 25)}...`
                              : link}
                          </span>
                          <FaExternalLinkAlt className="ml-2 text-blue-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Display users without links */}
              <h2 className="text-xl font-bold py-8">النجوم بدون مشاركات</h2>
              <div className="flex flex-wrap gap-2">
                {ad?.users
                  ?.filter((user) => user?.links?.length === 0)
                  .map((user, index) => (
                    <span
                      key={index}
                      className="bg-gray-50 w-auto max-w-xs mx-2 px-4 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow truncate"
                    >
          {user?.userId?.name}{" "}
                    </span>
                  ))}
                
                
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <FaImage className="text-purple-500" />
              <h4 className="text-lg font-semibold">الصور</h4>
            </div>
            {ad?.Images?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {ad.Images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`صورة الإعلان ${index + 1}`}
                    className="w-full h-24 sm:h-32 md:h-40 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                لا توجد صور متاحة
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <FaVideo className="text-red-500" />
              <h4 className="text-lg font-semibold">الفيديو</h4>
            </div>
            {ad?.videos ? (
              <video
                controls
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              >
                <source src={ad.videos} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو
              </video>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                لا يوجد فيديو متاح
              </p>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            variant="destructive"
            onClick={handleDeleteAd}
            className="bg-red-600 text-white mx-3"
          >
            حذف الإعلان
          </Button>

          {user?.role === "admin" && (
            <Link
              className="bg-blue-600 text-white mx-3 px-4 py-2 rounded-lg"
              to={`/dashboard/editAd/${selected}`}
            >
              تعديل الإعلان
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdDetails;
