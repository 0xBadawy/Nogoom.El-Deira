import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Configuration/Firebase";
import toast, { Toaster } from "react-hot-toast";

const AccountSettings = () => {
  const { getUserData, updateUser } = useAuth();
  const [userData, setUserData] = useState({});
  const [imageURL, setImageURL] = useState("");
  const { control, handleSubmit, setValue } = useForm();
  const [uploadImageProgress, setuploadImageProgress] = useState(0); // حالة لنسبة الرفع

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    };
    fetchData();
  }, [getUserData, setValue]);

  const onSubmit = (data) => {
    const Data = {
      ...data,
      ...(imageURL && { profilePicture: imageURL }), // إضافة فقط إذا كانت imageURL موجودة
      verified: false,
    };
    updateUser(data.Uid, Data);
    toast.success("تم حفظ التعديلات بنجاح");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("يرجى رفع ملف صورة فقط.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("حجم الصورة كبير جدًا. الحد الأقصى هو 2 ميغابايت.");
      return;
    }

    setuploadImageProgress(0);

    let fileName = userData.email || "noUser";
    const storageRef = ref(storage, `${fileName}/profile/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("نسبة التقدم:", progress); // عرض نسبة الرفع
        setuploadImageProgress(progress);
      },
      (error) => {
        console.error("خطأ أثناء رفع الصورة:", error); // عرض تفاصيل الخطأ
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // console.log("رابط الصورة الذي تم رفعها:", downloadURL); // تحقق من الرابط
          setImageURL(downloadURL);
          setuploadImageProgress(0);
        } catch (err) {
          console.error("خطأ في الحصول على رابط التنزيل:", err);
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-900">
          إعدادات الحساب
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-gray-600">
          يمكنك هنا تحديث بيانات حسابك بما في ذلك التفاصيل الشخصية وصورتك
          الشخصية.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <Controller
              name="profilePicture"
              control={control}
              render={({ field }) => (
                <img
                  className="object-cover w-32 h-32 rounded-full ring-4 ring-indigo-300 mb-4"
                  src={
                    imageURL || field.value || "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                />
              )}
            />
            <Label htmlFor="profilePicture" className="cursor-pointer">
              <span className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
                تغيير الصورة الشخصية
              </span>
              <Input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {uploadImageProgress != 0 && (
                <div className="relative w-full mt-4 h-2 bg-gray-200 rounded-lg dark:bg-gray-700">
                  <div
                    className="absolute top-0 left-0 h-2 rounded-lg bg-blue-500"
                    style={{ width: `${uploadImageProgress}%` }}
                  ></div>
                </div>
              )}
            </Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "الاسم الكامل مطلوب" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input {...field} />
                    {error && (
                      <span className="text-red-500 text-sm">
                        {error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "البريد الإلكتروني غير صالح",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input {...field} type="email" />
                    {error && (
                      <span className="text-red-500 text-sm">
                        {error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "رقم الهاتف مطلوب" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input {...field} />
                    {error && (
                      <span className="text-red-500 text-sm">
                        {error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">المنطقة</Label>
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ? field.value.join(", ") : ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((item) => item.trim())
                      )
                    }
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">نبذة عنك</Label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => <Textarea {...field} rows={4} />}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["facebook", "instagram", "snapchat", "tiktok", "twitter"].map(
              (platform) => (
                <div key={platform} className="space-y-2">
                  <Label htmlFor={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Label>
                  <Controller
                    name={platform}
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
              )
            )}
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "facebookLink",
              "instagramLink",
              "snapchatLink",
              "tiktokLink",
              "twitterLink",
            ].map((link) => (
              <div key={link} className="space-y-2">
                <Label htmlFor={link}>{link.replace("Link", " رابط")}</Label>
                <Controller
                  name={link}
                  control={control}
                  render={({ field }) => <Input {...field} type="url" />}
                />
              </div>
            ))}
          </div> */}
          <Button type="submit" className="w-full">
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
      <Toaster position="top-center" reverseOrder={false} />
    </Card>
  );
};

export default AccountSettings;
