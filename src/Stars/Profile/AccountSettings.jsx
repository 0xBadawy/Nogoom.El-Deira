import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AccountSettings = () => {
  const { getUserData } = useAuth();

  const [userData, setUserData] = useState({
    Uid: "",
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
    updatedAt: "",
    address: "",
    profilePicture: "",
    bio: "",
    dateOfBirth: "",
    gender: "",
    preferredLanguage: "",
    lastLogin: "",
    accountStatus: "",
    accountType: "",
    notificationSettings: {
      email: true,
      sms: false,
      push: true,
    },
    referralCode: "",
    referredBy: "",
    permissions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
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
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-900">إعدادات الحساب</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-gray-600">
          يمكنك هنا تحديث بيانات حسابك بما في ذلك التفاصيل الشخصية وصورتك الشخصية.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <img
              className="object-cover w-32 h-32 rounded-full ring-4 ring-indigo-300 mb-4"
              src={userData.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <Label htmlFor="profilePicture" className="cursor-pointer">
              <span className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
                تغيير الصورة الشخصية
              </span>
              <Input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={userData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">المنطقة</Label>
              <Input
                id="area"
                value={userData.area.join(", ")}
                onChange={(e) => handleInputChange("area", e.target.value.split(",").map(item => item.trim()))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">نبذة عنك</Label>
            <Textarea
              id="bio"
              value={userData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["facebook", "instagram", "snapchat", "tiktok", "twitter"].map((platform) => (
              <div key={platform} className="space-y-2">
                <Label htmlFor={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
                <Input
                  id={platform}
                  value={userData[platform]}
                  onChange={(e) => handleInputChange(platform, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["facebookLink", "instagramLink", "snapchatLink", "tiktokLink", "twitterLink"].map((link) => (
              <div key={link} className="space-y-2">
                <Label htmlFor={link}>{link.replace("Link", " رابط")}</Label>
                <Input
                  id={link}
                  type="url"
                  value={userData[link]}
                  onChange={(e) => handleInputChange(link, e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full">حفظ التغييرات</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;

