import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useDashboard } from "../../Context/DashboardContext";
import { Tiers } from "../../Stars/SignUp/data";
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UserDetails = ({ selectedUserUid, usersData, onSave }) => {
  const {
    
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const user = usersData.find((user) => user.Uid === selectedUserUid);
    if (user) {
      // Set default values using reset
      reset(user);
    }
  }, [selectedUserUid, usersData, reset]);

  const onSubmit = (data) => {

 
   confirmAlert({
     title: "تأكيد الحفظ",
     message: "هل تريد بالتأكيد حفظ التعديلات؟",
     buttons: [
       {
         label: "نعم",
         onClick: () => {
           onSave(data);
           toast.success("تم حفظ التعديلات بنجاح");
         },
       },
       {
         label: "إلغاء",
         onClick: () => {
           toast.error("تم إلغاء العملية");
         },
       },      
     ],
   });
  };


  



  return (
    <div className=" h-fit dark:bg-gray-900 p-5 rounded-lg">
      <h3 className="font-bold">بيانات المستخدم</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 grid grid-cols-6 gap-3"
      >
        <div className="mb-4 grid md:col-span-2 col-span-6">
          <label className="block mb-2 text-right">
            حالة المستخدم
            <select
              {...register("verified")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            >
              <option value="true">تم القبول</option>
              <option value="false">قيد المراجعة</option>
            </select>
          </label>
        </div>

        {/* Name */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            الاسم
            <input
              type="text"
              {...register("name")}
              className="w-full p-2 mt-2  rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Email */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            البريد الإلكتروني
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Phone */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            الهاتف
            <input
              type="tel"
              {...register("phone")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Iban */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            الآيبان
            <input
              type="text"
              {...register("iban")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Area */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            المنطقة
            <input
              type="text"
              {...register("area")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Govern */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            المحافظة
            <input
              type="text"
              {...register("govern")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Balance */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            الرصيد
            <input
              type="number"
              {...register("balance")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Created At */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            تاريخ الإنشاء
            <input
              type="date"
              {...register("createdAt")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Facebook */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Facebook
            <input
              type="text"
              {...register("facebook")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Facebook Link */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Facebook Link
            <input
              type="text"
              {...register("facebookLink")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Instagram */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Instagram
            <input
              type="text"
              {...register("instagram")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Instagram Link */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Instagram Link
            <input
              type="text"
              {...register("instagramLink")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Snapchat */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Snapchat
            <input
              type="text"
              {...register("snapchat")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Snapchat Link */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Snapchat Link
            <input
              type="text"
              {...register("snapchatLink")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Tiktok */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Tiktok
            <input
              type="text"
              {...register("tiktok")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Tiktok Link */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Tiktok Link
            <input
              type="text"
              {...register("tiktokLink")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Twitter */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Twitter
            <input
              type="text"
              {...register("twitter")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Twitter Link */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Twitter Link
            <input
              type="text"
              {...register("twitterLink")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>

        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Verified By
            <input
              type="text"
              {...register("verifiedBy")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Updated At */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Updated At
            <input
              type="date"
              {...register("updatedAt")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Address */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Address
            <input
              type="text"
              {...register("address")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Profile Picture */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Profile Picture
            <input
              type="text"
              {...register("profilePicture")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Bio */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Bio
            <input
              type="text"
              {...register("bio")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Date Of Birth */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Date Of Birth
            <input
              type="date"
              {...register("dateOfBirth")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Gender */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Gender
            <input
              type="text"
              {...register("gender")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Preferred Language */}
        {/* <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Preferred Language
            <input
              type="text"
              {...register("preferredLanguage")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div> */}
        {/* Last Login */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            اخر تسجيل دخول
            <input
              type="date"
              {...register("lastLogin")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        {/* Account Status */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Account Status
            <input
              type="text"
              {...register("accountStatus")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>

        {/* Account Type */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            فئة النجم
            <select
              {...register("accountType")}
              className="block w-full p-2 border rounded-lg dark:bg-gray-800"
            >
              <option value="" disabled>
                اختر فئة
              </option>
              {Tiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name} - شرط المشاهدات: {tier.views}+ - الأرباح:{" "}
                  {tier.earnings} ريال
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* permissions */}

        {/* <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            permissions
            <input
              type="text"
              {...register("permissions")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div> */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <button
            type="submit"
            className="px-6 py-2 mt-4 bg-blue-500 text-white rounded-lg"
          >
            حفظ التعديلات
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UserDetails;
