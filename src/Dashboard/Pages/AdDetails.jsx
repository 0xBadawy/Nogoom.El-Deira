import { FaStar, FaRegStar, FaCalendarAlt, FaMapMarkerAlt, FaVideo, FaImage } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { useDashboard } from "../../Context/DashboardContext";
import { AdEditModal } from "./AdEditModal";

const AdDetails = ({ ads, selected }) => {
  const ad = ads.find((ad) => ad.id === selected);
  const {deleteAdFromDB} = useDashboard()

  function translateToArabic(english) {
    const translations = {
      events: "مناسبات",
      real_estate: "عقارات",
      cars: "سيارات",
      electronics: "إلكترونيات",
      services: "خدمات",
      home_supplies: "لوازم منزلية",
      personal_supplies: "لوازم شخصية",
      animals: "حيوانات",
    };

    return translations[english] || "ترجمة غير متوفرة";
  }

  const handelDelet = () => {
    const Delete = async () => {
      const userConfirmed = confirm("هل أنت متأكد من حذف هذا العنصر؟");
      if (userConfirmed) {
        try {
          await deleteAdFromDB(selected);
          alert("تم حذف العنصر بنجاح!"); // Optional success message
        } catch (error) {
          console.error("حدث خطأ أثناء الحذف:", error);
          alert("حدث خطأ أثناء الحذف."); // Optional error message
        }
      } else {
        alert("تم إلغاء العملية."); // Optional cancellation message
      }
    };
  
    Delete();
  };
  

  return (
    <Card className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl sm:text-3xl font-bold">{ad?.title}</CardTitle>
        <Badge variant="secondary" className="mt-2">
          {translateToArabic(ad.category)}
        </Badge>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6">
          {ad.description}
        </p>
        <Separator className="my-6" />
        <div className="space-y-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <FaCalendarAlt className="text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">تاريخ البداية</p>
              <p className="text-base font-semibold">{ad.startDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">تاريخ النهاية</p>
              <p className="text-base font-semibold">{ad.endDate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <FaMapMarkerAlt className="text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">المنطقة</p>
              <p className="text-base font-semibold">{ad.region}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">المحافظات</p>
            <div className="flex flex-wrap gap-2">
              {ad.governorates.length > 0 ? (
                ad.governorates.map((gov, index) => (
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
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">النجوم المشاركين</p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="flex">
                {ad.stars.length > 0 && ad.stars.length < 11 ? (
                  Array.from({ length: ad.stars.length }).map((_, index) => (
                    <FaStar key={index} className="text-yellow-500 text-lg" />
                  ))
                ) : (
                  <FaRegStar className="text-gray-400 text-lg" />
                )}
              </div>
              <span className="text-sm font-semibold">({ad.stars.length})</span>
            </div>
            <p className="text-sm mt-2">
              {ad.stars.length > 0
                ? ad.stars.map((star, index) => (
                    <span key={index}>
                      {star.name}
                      {index < ad.stars.length - 1 ? '، ' : ''}
                    </span>
                  ))
                : 'لا يوجد نجوم مشاركين'}
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <FaImage className="text-purple-500" />
              <h4 className="text-lg font-semibold">الصور</h4>
            </div>
            {ad.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {ad.images.map((img, index) => (
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
            {ad.video ? (
              <video
                controls
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              >
                <source src={ad.video} type="video/mp4" />
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
          <Button variant="destructive" onClick={handelDelet} className="bg-red-600 text-white">
            حذف الإعلان
          </Button>
          {selected &&   <AdEditModal ads={ads} selected={1}   />}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdDetails;

