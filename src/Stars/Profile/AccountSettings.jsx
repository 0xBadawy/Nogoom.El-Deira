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
import { GovernmentData } from "../SignUp/data";

const AccountSettings = () => {
  const { getUserData, updateUser } = useAuth();
  const [userData, setUserData] = useState({});
  const [imageURL, setImageURL] = useState("");
  const { control, handleSubmit, setValue } = useForm();
  const [uploadImageProgress, setuploadImageProgress] = useState(0); // حالة لنسبة الرفع
  const [selectedItems, setSelectedItems] = useState([]);


  // Function to find the selected government from the GovernmentData
  const findSelectedGovernment = (selectedValue) => {
    return GovernmentData.find((gov) => gov.name === selectedValue);
  };

  // Function to update the selected items based on the selected government
  const updateSelectedItems = (selectedGovernment) => {
    setSelectedItems(selectedGovernment ? selectedGovernment.subGovernments : []);
  };

  // Main event handler function
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Find the selected government
    const selectedGovernment = findSelectedGovernment(selectedValue);

    // Update the selected items
    updateSelectedItems(selectedGovernment);

    console.log("selectedGovernment", selectedGovernment);
    console.log("selectedItems", selectedItems);
  };








  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
      updateSelectedItems(findSelectedGovernment(data.govern));
    };
    fetchData();

  }, [getUserData, setValue]);

  const onSubmit = (data) => {

    // check area and govern is selected 

    if (data.govern === "" ||!data.govern  ) {

      toast.error("يجب إدخال المنطقة.");
      
      return;
    }
    
    if (data.area.length === 0) {
      toast.error("يجب اختيار المحافظة.");
      return;
    }

    


     if (!/^\d{10,11}$/.test(data.phone)) {
      toast.error("يجب أن يكون رقم الهاتف مكوناً من 10 أو 11 رقماً ويتكون من أرقام فقط");
      return;
    }


    const Data = {
      ...data,
      ...(imageURL && { profilePicture: imageURL }), // إضافة فقط إذا كانت imageURL موجودة
      verified: false,
    };
    updateUser(data.Uid, Data);
    toast.success("تم حفظ التعديلات بنجاح");
    // console.log(data)
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
              <Label htmlFor="name">الاسم الكامل*</Label>
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
            {/* <div className="space-y-2">
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
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف*</Label>
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

            {/* <div className="space-y-2">
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
            </div> */}

            <div className="mb-4">
              <label className="block text-gray-700">{"المنطقة*"}</label>
              <Controller
                name="govern"
                control={control}
                render={({ field }) => (
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleSelectChange(e);
                    }}
                  >
                    <option value="" >اختر المنطقة</option>
                    {GovernmentData.map((gov) => (
                      <option key={gov.name} value={gov.name}>
                        {gov.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>


            <div className="mb-4 ">
              <label className="block text-lg font-semibold text-gray-700">{"المحافظة*"}</label>
              <Controller
                name="area"
                control={control}
                render={({ field }) => {
                  useEffect(() => {
                    // Reset selected values when selectedItems change
                    field.onChange([]); // Clear the selected items
                  }, [selectedItems]); // Run the effect when selectedItems changes

                  return (
                    <div className="space-y-3  ">
                  <div className="max-h-32 overflow-y-auto p-2 border border-gray-300 rounded-md shadow-sm">
  {selectedItems.length ? (
    selectedItems.map((item) => (
      <div key={item} className="flex items-center space-x-3">
        <input
          type="checkbox"
          id={item}
          value={item}
          checked={field.value.includes(item)}
          onChange={(e) => {
            if (e.target.checked) {
              field.onChange([...field.value, item]);
            } else {
              field.onChange(field.value.filter((i) => i !== item));
            }
          }}
          className="h-4 w-4 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        />
        <label htmlFor={item} className="text-gray-800 px-2">{item}</label>
      </div>
    ))
  ) : (
    <p>   قم بأختيار المنطقة اولا</p>
  )}
</div>

                    </div>
                  );
                }}
              />
            </div>

            <div className="space-y-2 ">
              <Label htmlFor="bio">نبذة عنك</Label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => <Textarea {...field} rows={4} />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["facebook", "instagram", "snapchat", "tiktok", "twitter", "youtube"].map(
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
          <Button type="submit" className="w-full text-white">
            حفظ التغييرات
          </Button>
        </form>
      </CardContent>
      <Toaster position="top-center" reverseOrder={false} />
    </Card>
  );
};

export default AccountSettings;
