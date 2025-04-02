import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, CheckCircle2, Wallet, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axiosInstance from "../../Configuration/axiosInstance";

const UserDetailsBalance = ({ selectedUserUid, usersData, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const Tiers = [
    { name: "نجم عادي", views: 1000, earnings: 10, value: "none" },
    { name: "نجم فضي", views: 5000, earnings: 30, value: "silver" },
    { name: " نجم ذهبي", views: 10000, earnings: 50, value: "gold" },
    { name: " نجم برونزي", views: 100000, earnings: 100, value: "bronze" },
  ];
  const [selectedSubGovernments, setSelectedSubGovernments] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const user = usersData.find((user) => user._id === selectedUserUid);
    if (user) {
       reset(user);
      setValue(
        "userStatus",
        user.verified ? `accepted_${user.accountType}` : "pending"
      );
      setBalance(user.balance || 0);
    }
  }, [selectedUserUid, usersData, reset]);

  const adjustBalance = (amount) => {
    setBalance((prevBalance) => {
      const newBalance = Math.max(0, prevBalance + amount);
      // Add subtle animation effect
      const element = document.getElementById("balance-input");
      element.classList.add("scale-105");
      setTimeout(() => element.classList.remove("scale-105"), 200);
      return newBalance;
    });
  };

  const HandelSave = async (dataForm) => {
    const allData = {
      balance: balance,
      accountType: dataForm.accountType,
      verified: dataForm.verified,
    };

 
    try {
      const response = await axiosInstance.put(
        `/user/update_user/${selectedUserUid}`,
        allData
      );
      // await updateUser(response.data.data);
      toast.success("تم حفظ التعديلات بنجاح");
       window.location.reload();

    } catch (error) {
      console.error("خطأ في تحديث البيانات:", error);
      toast.error("فشل في تحديث البيانات");
    }

    setIsUpdating(false);
  };

  const onSubmit = (data) => {
    setIsUpdating(true);

    const isVerified = data.userStatus.startsWith("accepted");
    const selectedTier = isVerified ? data.userStatus.split("_")[1] : "none";

    const allData = {
      balance: balance,
      accountType: selectedTier, // تخزين الفئة وحدها
      verified: isVerified, // تخزين الحالة وحدها
    };

    confirmAlert({
      title: "تأكيد الحفظ",
      message: `سيتم تغيير مبلغ النجم إلى ${balance} ريال و ${
        isVerified ? `تفعيل الحساب (${selectedTier})` : "إلغاء تفعيل الحساب"
      }`,
      buttons: [
        {
          label: "نعم",
          onClick: () => HandelSave(allData),
        },
        {
          label: "إلغاء",
          onClick: () => {
            toast.error("تم إلغاء العملية");
            setIsUpdating(false);
          },
        },
      ],
    });
  };

  return (
    <div className="max-w- xl mx-auto mt-10 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="text-center border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-t-xl">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800">
          <User className="h-8 w-8 text-blue-500" />
          بيانات الرصيد والحالة والفئة
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Status */}
            {/* User Status with Star Category */}
            <div className="space-y-2">
              <label className="block text-right text-gray-700 font-medium">
                حالة المستخدم والفئة
              </label>

              <select
                {...register("userStatus")}
                className="w-full p-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                <option value="pending">قيد المراجعة</option>
                {Tiers.map((tier) => (
                  <option key={tier.value} value={`accepted_${tier.value}`}>
                    تم القبول - {tier.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Balance Section */}
            <div className="space-y-2">
              <label className="block text-right text-gray-700 font-medium">
                الرصيد
              </label>
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Wallet className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="balance-input"
                    type="number"
                    value={balance}
                    readOnly
                    className="w-full p-3 pr-12 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    {[10, 100].map((amount) => (
                      <button
                        key={`increase-${amount}`}
                        type="button"
                        onClick={() => adjustBalance(amount)}
                        className="flex-1 py-2 px-4 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 transition-colors duration-200"
                      >
                        +{amount}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {[10, 100].map((amount) => (
                      <button
                        key={`decrease-${amount}`}
                        type="button"
                        onClick={() => adjustBalance(-amount)}
                        className="flex-1 py-2 px-4 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors duration-200"
                      >
                        -{amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-sky-900 to-sky-700 hover:from-sky-700 hover:to-sky-900 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "جاري الحفظ..." : "حفظ تعديلات الرصيد"}
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UserDetailsBalance;
