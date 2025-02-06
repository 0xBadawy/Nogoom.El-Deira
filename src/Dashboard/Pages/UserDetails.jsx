import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDashboard } from "../../Context/DashboardContext";
import { GovernmentData, Tiers } from "../../Stars/SignUp/data";
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


  const [selectedItems, setSelectedItems] = useState([]);
 
 
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedGovernment = GovernmentData.find(
      (gov) => gov.name === selectedValue
    );
    setSelectedItems(
      selectedGovernment ? selectedGovernment.subGovernments : []
    );
    console.log("selectedGovernment",selectedGovernment)
    console.log("selectedItems",selectedItems)
  };



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
        {/* <div className="mb-4 grid md:col-span-2 col-span-6">
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
        </div> */}

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
        {/* 
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            الآيبان
            <input
              type="text"
              {...register("iban")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div> */}

 


        {/* Area */}
        {/* <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            المنطقة
            <input
              type="text"
              {...register("area")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div> */}
        {/* Govern */}
        {/* <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            المحافظة
            <input
              type="text"
              {...register("govern")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div> */}

{/* ********************************************** */}


























 



        {/* Balance */}
        {/* <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            الرصيد
            <input
              type="number"
              {...register("balance")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div> */}
        {/* Created At
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            تاريخ الإنشاء
            <input
              type="date"
              {...register("createdAt")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div> */}
        {/* Facebook */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
             
            <input
              type="text"
              {...register("facebook")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
       
        {/* Instagram */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
             
            <input
              type="text"
              {...register("instagram")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
       
        {/* Snapchat */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
             
            <input
              type="text"
              {...register("snapchat")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
        
        {/* Tiktok */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
             
            <input
              type="text"
              {...register("tiktok")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
       
        {/* Twitter */}
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
             
            <input
              type="text"
              {...register("twitter")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
       
  {/* 
          <div className="mb-4 grid   md:col-span-2 col-span-6 ">
            <label className="block mb-2 text-right">
              Verified By
              <input
                type="text"
                {...register("verifiedBy")}
                className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
              />
            </label>
          </div> */}
        {/* Updated At */}
        {/* <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Updated At
            <input
              type="date"
              {...register("updatedAt")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div>
       */}
        {/* Bio */}
{/*         
        <div className="mb-4 grid   md:col-span-2 col-span-6 ">
          <label className="block mb-2 text-right">
            Bio
            <input
              type="text"
              {...register("bio")}
              className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
            />
          </label>
        </div> */}
        
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
       
      
        {/* Account Type */}
        {/* <div className="mb-4 grid   md:col-span-2 col-span-6 ">
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
        </div> */}

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
<div className="mb-4">
                <label className="block text-gray-700">{"المنطقة"}</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  {...register("govern")}
                  onChange={handleSelectChange}
                >
                  <option value="">اختر المنطقة</option>
                  {GovernmentData.map((gov) => (
                    <option key={gov.name} value={gov.name}>
                      {gov.name}
                    </option>
                  ))}
                </select>
              </div>
              </div>


              <div className="mb-4 grid   md:col-span-2 col-span-6 ">

              <div className="mb-4">
                <label className="block text-gray-700">{"المحافظة"}</label>
                <select
                  multiple
                  className="w-full h-40 border rounded-lg overflow-auto"
                  {...register("area")}
                >
                  {selectedItems.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              </div>



        <div className="mb-4 grid h-fit  md:col-span-6 col-span-6 ">
          <button
            type="submit"
            className="px-6 py-2 mt-4 h-fit bg-blue-500 text-white rounded-lg"
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
