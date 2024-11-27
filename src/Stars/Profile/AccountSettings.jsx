import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const AccountSettings = () => {

 const { getUserData } = useAuth();

 const [userData, setUserData] = useState({
   name: "",
   email: "",
   phone: "",
   area: [],
   balance: 0,
   createdAt: "",
   facebook: "",
   facebookLink: "",
   iban: "",
   instagram: "",
   instagramLink: "",
   snapchat: "",
   snapchatLink: "",
   tiktok: "",
   tiktokLink: "",
   twitter: "",
   twitterLink: "",
   privacyPolicy: false,
   verified: false,
   verifiedBy: "",
 });

 useEffect(() => {
   const fetchData = async () => {
     const data = await getUserData();
     console.log(data);
     setUserData(data);
   };
   fetchData();
 }, [getUserData]);



  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", userData);
    alert("تم تحديث البيانات بنجاح!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-900">إعدادات الحساب</h2>
      <p className="mt-4 text-gray-600">
        يمكنك هنا تحديث بيانات حسابك بما في ذلك التفاصيل الشخصية وصورتك الشخصية.
      </p>

      {/* صورة الملف الشخصي */}
      <div className="mt-6 flex flex-col items-center">
        <img
          className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300 mb-4"
          src={userData.profilePicture}
          alt="Profile"
        />
        <label className="block text-sm font-medium text-indigo-900 mb-2">
          تغيير الصورة الشخصية
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* باقي الحقول */}
        <div>
          <label className="block text-sm font-medium text-indigo-900">
            الاسم الكامل
          </label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-2 p-2 w-full border border-indigo-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-indigo-900">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-2 p-2 w-full border border-indigo-300 rounded-lg"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-indigo-900">
            رقم الهاتف
          </label>
          <input
            type="tel"
            value={userData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="mt-2 p-2 w-full border border-indigo-300 rounded-lg"
          />
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-medium text-indigo-900">
            المنطقة
          </label>
          <input
            type="text"
            value={userData.area.join(", ")}
            onChange={(e) =>
              handleInputChange(
                "area",
                e.target.value.split(",").map((item) => item.trim())
              )
            }
            className="mt-2 p-2 w-full border border-indigo-300 rounded-lg"
          />
        </div>

      

        {/* Social Media */}
        {["facebook", "instagram", "snapchat", "tiktok", "twitter"].map(
          (platform) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-indigo-900">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </label>
              <input
                type="text"
                value={userData[platform]}
                onChange={(e) => handleInputChange(platform, e.target.value)}
                className="mt-2 p-2 w-full border border-indigo-300 rounded-lg"
              />
            </div>
          )
        )}

        {/* Social Links */}
        {[
          "facebookLink",
          "instagramLink",
          "snapchatLink",
          "tiktokLink",
          "twitterLink",
        ].map((link) => (
          <div key={link}>
            <label className="block text-sm font-medium text-indigo-900">
              {link.replace("Link", " رابط")}
            </label>
            <input
              type="url"
              value={userData[link]}
              onChange={(e) => handleInputChange(link, e.target.value)}
              className="mt-2 p-2 w-full border border-indigo-300 rounded-lg"
            />
          </div>
        ))}

     

        {/* باقي الكود نفسه */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
