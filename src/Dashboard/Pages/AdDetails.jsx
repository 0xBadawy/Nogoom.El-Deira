import { FaStar, FaRegStar } from "react-icons/fa";

const AdDetails = ({ ads, selected }) => {
  console.log(ads);
  console.log(selected);
  const ad = ads.find((ad) => ad.id === selected);
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

    return translations[english] || "ترجمة غير متوفرة"; // Default message if translation is not found
  }

  
  return (
    <div className="max-w-full sm:max-w-lg mx-auto shadow-xl p-5 sm:p-8 bg-white dark:bg-gray-900 rounded-lg transition-transform transform">
      <h3 className="text-3xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 leading-tight">
        {ad?.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
        {ad.description}
      </p>
      <ul className="space-y-6 sm:space-y-5">
        <li className="flex items-center space-x-3">
          <strong className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
            الفئة:
          </strong>
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm sm:text-base">
            {translateToArabic(ad.category)}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <strong className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
            تاريخ البداية:
          </strong>
          <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {ad.startDate}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <strong className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
            تاريخ النهاية:
          </strong>
          <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {ad.endDate}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <strong className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
            المنطقة:
          </strong>
          <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {ad.region}
          </span>
        </li>
        <li>
          <strong className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
            المحافظات:
          </strong>
          {ad.governorates.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {ad.governorates.map((gov, index) => (
                <span
                  key={index}
                  className="bg-green-600 text-white px-4 py-2 text-sm sm:text-base rounded-full"
                >
                  {gov}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              لم يتم تحديد محافظات
            </span>
          )}
        </li>
        <li className="flex items-center space-x-2">
          <strong className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
            عدد النجوم المشاركين : {ad.stars.length}
          </strong>
          {ad.stars.length > 0 && ad.stars.length < 11 ? (
            ad.stars.map((star, index) => (
              <FaStar
                key={index}
                className="text-yellow-500 text-lg sm:text-xl"
              />
            ))
          ) : (
            <FaRegStar className="text-gray-400 text-lg sm:text-xl" />
          )}
        </li>
        <li>
          <strong className="block text-gray-800 dark:text-gray-200 mb-3 text-sm sm:text-base">
            الصور:
          </strong>
          {ad.images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {ad.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`صورة الإعلان ${index + 1}`}
                  className="w-full h-36 sm:h-40 lg:h-48 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              لا توجد صور متاحة
            </p>
          )}
        </li>
        <li>
          <strong className="block text-gray-800 dark:text-gray-200 mb-3 text-sm sm:text-base">
            الفيديو:
          </strong>
          {ad.video ? (
            <video
              controls
              className="mt-2 w-64 max-w-full rounded-lg shadow-md"
            >
              <source src={ad.video} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              لا يوجد فيديو متاح
            </p>
          )}
        </li>
      </ul>
      <div>
        {/* delete */}
     <div className="flex gap-3">
  <button  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-colors">
            حذف الإعلان
            </button>
            {/* edit */}
            <button  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors">
            تعديل الإعلان
            </button>
            

      </div>
      </div>
    </div>
  );
};

export default AdDetails;
