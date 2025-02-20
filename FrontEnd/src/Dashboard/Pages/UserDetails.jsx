import React, { useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Configuration/Firebase";
import toast, { Toaster } from "react-hot-toast";
import AreaGovernmentSelector from "../../Components/AreaGovernmentSelector";
import axiosInstance from "../../Configuration/axiosInstance";

const AccountSettings = ({ selectedUserUid, usersData }) => {
  const { updateUser } = useAuth();
  const [userData, setUserData] = useState({});
  const [address, setAddress] = useState({});
  const [imageURL, setImageURL] = useState("");
  const { control, handleSubmit, setValue } = useForm();
  const [selectedAddress, setSelectedAddress] = useState({});
  const [uploadImageProgress, setUploadImageProgress] = useState(0);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const user = usersData.find((user) => user._id === selectedUserUid);
    console.log(user);
    if (user) {
      setUserData(user);
      setAddress({
        area: user.address?.area || "",
        governments: user.address?.govern || [],
      });
      setSocialLinks(user.social || []);
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("bio", user.bio);
      setValue("email", user.email);
      // setValue
      
      
      setImageURL(user.profileImage || "");
      

      
      
      console.log(user.profileImage || "");




    }
  }, [selectedUserUid, usersData, setValue]);

  const handleInputChange = (index, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].link = value;
    setSocialLinks(updatedLinks);
  };

  const onSubmit = async (data) => {
    const allData = {
      ...data,
      selectedAddress,
      profileImage: imageURL,
      verified: false,
      socialLinks,
    };

    try {
      const response = await axiosInstance.put(
        `/user/update_user/${selectedUserUid}`,
        allData
      );
      await updateUser(response.data.data);
      toast.success("تم حفظ التعديلات بنجاح");
      console.log(response.data);
    } catch (error) {
      console.error("خطأ في تحديث البيانات:", error);
      toast.error("فشل في تحديث البيانات");
    }
  };

  const handleSelectionChange = ({ selectedArea, selectedGovernments }) => {
    setSelectedAddress((prevState) => {
      if (
        prevState.area === selectedArea &&
        JSON.stringify(prevState.govern) === JSON.stringify(selectedGovernments)
      ) {
        return prevState;
      }
      return { area: selectedArea, govern: selectedGovernments };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("يرجى رفع ملف صورة فقط.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("حجم الصورة كبير جدًا. الحد الأقصى هو 2 ميغابايت.");
      return;
    }

    setUploadImageProgress(0);
    const fileName = userData.email || "noUser";
    const storageRef = ref(storage, `${fileName}/profile/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadImageProgress(progress);
      },
      (error) => {
        toast.error("خطأ أثناء رفع الصورة.");
        console.error("خطأ أثناء رفع الصورة:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageURL(downloadURL);
          setUploadImageProgress(0);
          toast.success("تم رفع الصورة بنجاح.");
        } catch (err) {
          console.error("خطأ في الحصول على رابط التنزيل:", err);
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-900 mt-10">
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
                    imageURL ||
                    userData.profileImage ||
                    "https://via.placeholder.com/150"
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
              {uploadImageProgress !== 0 && (
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
              <Label htmlFor="name">اسم الشهرة او الحساب*</Label>
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
              <Label htmlFor="email">البريد الإلكتروني* </Label>
              <Controller
                name="email"
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

            <div className="grid grid-cols-3 gap-6">
              <label htmlFor="">التواصل الاجتماعي</label>

              {socialLinks.map(
                (item, index) =>
                  (item.link || item.label) && (
                    <div key={index} className="space-y- col-span-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-between">
                        <input
                          type="url"
                          value={item.link || ""}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          className="w-full bg-gray-100 border-none focus:ring-0"
                          placeholder={`أدخل الرابط لـ ${
                            item.label || "التواصل الاجتماعي"
                          }`}
                        />
                      </div>
                    </div>
                  )
              )}

              <button
                type="button"
                onClick={() =>
                  setSocialLinks([...socialLinks, { label: "", link: " " }])
                }
                className="col-span-3 mt-4 max-h-10 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                إضافة رابط جديد
              </button>
            </div>

            <AreaGovernmentSelector
              initialData={address}
              onSelectionChange={handleSelectionChange}
            />

            <div className="space-y-2 col-span- h-full">
              <Label htmlFor="bio">نبذة عنك</Label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => <Textarea {...field} rows={4} />}
              />
            </div>

            {/* -------------------------------------------------------------- */}

            {/* -------------------------------------------------------------- */}
          </div>

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
