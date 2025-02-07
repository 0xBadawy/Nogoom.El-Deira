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
    reset,watch,
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
    console.log("selectedGovernment", selectedGovernment)
    console.log("selectedItems", selectedItems)
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


        <div className="col-span-6">
  <div>روابط التواصل الاجتماعى</div>

  {watch("facebook") && (
    <div className="mb-4 grid md:col-span-2 col-span-3">
      <label className="block mb-2 text-right">
        <input
          type="text"
          {...register("facebook")}
          className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
        />
      </label>
    </div>
  )}

  {watch("instagram") && (
    <div className="mb-4 grid md:col-span-2 col-span-3">
      <label className="block mb-2 text-right">
        <input
          type="text"
          {...register("instagram")}
          className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
        />
      </label>
    </div>
  )}

  {watch("snapchat") && (
    <div className="mb-4 grid md:col-span-2 col-span-3">
      <label className="block mb-2 text-right">
        <input
          type="text"
          {...register("snapchat")}
          className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
        />
      </label>
    </div>
  )}

  {watch("tiktok") && (
    <div className="mb-4 grid md:col-span-2 col-span-3">
      <label className="block mb-2 text-right">
        <input
          type="text"
          {...register("tiktok")}
          className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
        />
      </label>
    </div>
  )}

  {watch("twitter") && (
    <div className="mb-4 grid md:col-span-2 col-span-3">
      <label className="block mb-2 text-right">
        <input
          type="text"
          {...register("twitter")}
          className="w-full p-2 mt-2 rounded-lg dark:bg-gray-800"
        />
      </label>
    </div>
  )}
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
