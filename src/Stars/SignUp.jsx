import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import LoginSchema from "../Validations/LoginValidation";
import handleFirebaseError from "../Validations/Errors";
import Logo from "../assets/Images/Logo/Deira-logo2.png";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    watch ,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // { resolver: zodResolver(LoginSchema) }
  const Government = [
    {
      name: "الرياض",
      subGovernments: [
        "الرياض",
        "الدرعية",
        "الخرج",
        "الدوادمي",
        "القويعية",
        "وادي الدواسر",
        "الأفلاج",
        "الزلفي",
        "شقراء",
        "المجمعة",
        "عفيف",
        "السليل",
        "الغاط",
        "حوطة بني تميم",
        "رماح",
        "المزاحمية",
      ],
    },
    {
      name: "مكة المكرمة",
      subGovernments: [
        "مكة المكرمة",
        "جدة",
        "الطائف",
        "القنفذة",
        "الليث",
        "الخرمة",
        "رنية",
        "تربة",
        "الكامل",
        "خليص",
      ],
    },
    {
      name: "المدينة المنورة",
      subGovernments: [
        "المدينة المنورة",
        "ينبع",
        "العلا",
        "بدر",
        "الحناكية",
        "خيبر",
        "المهد",
      ],
    },
    {
      name: "القصيم",
      subGovernments: [
        "بريدة",
        "عنيزة",
        "الرس",
        "المذنب",
        "البكيرية",
        "البدائع",
        "رياض الخبراء",
        "الأسياح",
        "عيون الجواء",
        "الشماسية",
      ],
    },
    {
      name: "المنطقة الشرقية",
      subGovernments: [
        "الدمام",
        "الأحساء",
        "القطيف",
        "حفر الباطن",
        "الخبر",
        "رأس تنورة",
        "الخفجي",
        "الجبيل",
        "النعيرية",
        "قرية العليا",
      ],
    },
    {
      name: "عسير",
      subGovernments: [
        "أبها",
        "خميس مشيط",
        "بيشة",
        "النماص",
        "محايل عسير",
        "أحد رفيدة",
        "ظهران الجنوب",
        "رجال ألمع",
        "سراة عبيدة",
      ],
    },
    {
      name: "تبوك",
      subGovernments: ["تبوك", "الوجه", "ضباء", "أملج", "حقل", "البدع"],
    },
    { name: "حائل", subGovernments: ["حائل", "بقعاء", "الشنان", "الغزالة"] },
    { name: "الحدود الشمالية", subGovernments: ["عرعر", "رفحاء", "طريف"] },
    {
      name: "جازان",
      subGovernments: ["جازان", "صبيا", "أبو عريش", "صامطة", "فرسان", "الدرب"],
    },
    { name: "نجران", subGovernments: ["نجران", "شرورة", "حبونا"] },
    {
      name: "الباحة",
      subGovernments: ["الباحة", "بلجرشي", "المخواة", "العقيق"],
    },
    {
      name: "الجوف",
      subGovernments: ["سكاكا", "القريات", "دومة الجندل", "طبرجل"],
    },
  ];


   const tiers = [
     { name: "عادي", views: 1000, earnings: 10 },
     { name: "فضي", views: 5000, earnings: 30 },
     { name: "ذهبي", views: 10000, earnings: 50 },
     { name: "برونزي", views: 100000, earnings: 100 },
   ];

   // مشاهدة الاختيار الحالي
   const selectedCategory = watch("category");

  const Text = {
    title: "تسجيل حساب جديد",
    name: "الاسم الكامل",
    email: "البريد الالكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    signUp: "تسجيل حساب",
    phone: "رقم الهاتف واتساب",
    username: "اسم المستخدم",
    govern: "المحافظة (يمكنك اختيار اكثر من محافظة)",
    area: "المنطقة",
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (!selectedValue) {
      setSelectedItems([]);
      return;
    }

    const selectedGovernment = Government.find(
      (gov) => gov.name === selectedValue
    );

    setSelectedItems(
      selectedGovernment ? selectedGovernment.subGovernments : []
    );
  };

  const FormSubmit = async (data) => {
    console.log(data);

    // try {
    //   setError(null); // Clear previous error
    //   setLoading(true);
    //   // Replace signUp with the actual authentication method
    //   console.log("Signup successful:", data);
    //   navigate("/profile");
    // } catch (error) {
    //   setError(handleFirebaseError(error.code));
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <img src={Logo} alt="logo" className="w-52 mx-auto" />
        <h2 className="text-2xl font-bold text-center mb-6">{Text.title}</h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">خطأ! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(FormSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {Text.name}
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              {...register("Name")}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {Text.email}
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              {...register("email")}
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {Text.phone}
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              {...register("Phone")}
            />
          </div>
          {/* Area */}

          <div className="mb-4">
            <label
              htmlFor="government"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {Text.area}
            </label>
            <select
              id="government"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              onChange={handleSelectChange}
            >
              <option value="">اختر المنظفة</option>
              {Government.map((gov) => (
                <option key={gov.name} value={gov.name}>
                  {gov.name}
                </option>
              ))}
            </select>
          </div>
          {/* Government */}

          <div className="mb-4">
            <label
              htmlFor="area"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {Text.govern}
            </label>
            <select
              id="area"
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition ease-in-out duration-150 overflow-y-auto h-40"
              {...register("Area")}
            >
              <option
                value="كل المحافظات"
                className="font-medium text-gray-700"
              >
                كل المحافظات
              </option>
              {selectedItems.map((area) => (
                <option
                  key={area}
                  value={area}
                  className="px-2 py-1 hover:bg-indigo-100 focus:bg-indigo-200 text-gray-600 cursor-pointer"
                >
                  {area}
                </option>
              ))}
            </select>
          </div>

          <label className="block text-gray-700 text-sm font-bold mb-2">
            اختيار فئة النجوم
          </label>

          <div className="grid grid-cols-2 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-4 border rounded-lg shadow-md transition ${
                  selectedCategory === tier.name
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300"
                }`}
              >
                <h3 className="text-xl font-bold text-indigo-600">
                  {tier.name}
                </h3>
                <p className="text-gray-700">شرط المشاهدات: {tier.views}+</p>
                <p className="text-gray-700">
                  الأرباح لكل حملة: {tier.earnings} ريال
                </p>
                <button
                  type="button"
                  onClick={() => setValue("category", tier.name)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
                >
                  اختر
                </button>
              </div>
            ))}

            <p className="text-gray-700 mb-4">
              * يجب تحقيق عدد المشاهدات لكل فئة
            </p>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600"
          >
            {Text.signUp}
          </button>
        </form>
        <div className="text-center mt-4">
          <span>لديك حساب بالفعل؟ </span>
          <Link to="/login" className="text-indigo-500">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
