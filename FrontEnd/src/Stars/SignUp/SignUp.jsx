import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "./FormField";
import SocialMediaInputs from "./SocialMediaInputs";
import TierSelection from "./TierSelection";
import Logo from "../../assets/Images/Logo/Deira-logo2.png";
import { GovernmentData, TextData, Tiers } from "./data";
import { useAuth } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useDashboard } from "../../Context/DashboardContext";
import CheckboxList from "../../Components/CheckboxList";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/Components/ui/select"

const SignUpPage = () => {
  const { signUp } = useAuth();

  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { SendSignupNotification } = useDashboard();
  const [selectedGovernorates, setSelectGovernorates] = useState([]);

  const handleSelectChange = (event) => {
    setSelectGovernorates([])
    const selectedValue = event.target.value;
    const selectedGovernment = GovernmentData.find(
      (gov) => gov.name === selectedValue
    );
    setSelectedItems(
      selectedGovernment ? selectedGovernment.subGovernments : []
    );
  };

  const handleFirebaseError = (errorCode) => {
    if (errorCode.includes("auth/email-already-in-use")) {
      return "هذا البريد الإلكتروني مستخدم بالفعل.";
    } else if (errorCode.includes("auth/weak-password")) {
      return "كلمة المرور ضعيفة جدًا. يجب أن تحتوي على 6 أحرف على الأقل.";
    } else {
      return "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى.";
    }
  };


  const onSubmit = async (data) => {

    const message = `تم تسجيل حساب جديد بواسطة ${data.name} - ${data.email} وبانتظار المراجعة`;
    const time = new Date();
    const readed = false;


    if (!data.privacyPolicy) {
      toast.error("يجب الموافقة على سياسة الخصوصية");
      return;
    }

    if (data.confirmPassword !== data.password) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }

    if (!/^\d{10,11}$/.test(data.phone)) {
      toast.error("يجب أن يكون رقم الهاتف مكوناً من 10 أو 11 رقماً ويتكون من أرقام فقط");
      return;
    }
    



    try {
      setError(null);
      setLoading(true);

      // Extract the necessary user data (e.g., name, role) excluding email and password
      const { email, password, confirmPassword, ...userData } = data;

      let NewData = {
        ...userData,
        area:selectedGovernorates
      } 

      console.log("NewData : ",NewData);

      // Call the signUp function
      const result = await signUp(email, password, NewData, "star");

      // Check if there was an error during sign-up
      if (!result.success) {
        setError(handleFirebaseError(result.error)); // Set error state
      } else {
        toast.success("تم تسجيل الحساب بنجاح!");
        SendSignupNotification({ message, readed, time }, "allAdmin");
        navigate("/status")
      }
    } catch (error) {
      setError(handleFirebaseError(error.code));
      console.error("Error during submission:", error.message);
    } finally {
      setLoading(false);
    }

    // console.log(data);  
  };






  
  const handleGovernorateSelection = (item, isSelected) => {
    setSelectGovernorates((prevState) => {
      if (isSelected) {
        if (!prevState.includes(item)) {
          return [...prevState, item];
        }
      } else {
        return prevState.filter((selectedItem) => selectedItem !== item);
      }
      return prevState;
    });
  };




  return (
    <div className="PatternBG py-10 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
        <img src={Logo} alt="logo" className="w-10 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-6">
          {TextData.title}
        </h2>

        {
          // Display error message
          error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">{" خطأ! "}</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )
        }

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main Data Section */}

            <div>
              <FormField id="name"  label={TextData.name} register={register} />
              <FormField
                id="email"
                label={TextData.email}
                type="email"
                register={register}
              />
              <FormField
                id="phone"
                label={TextData.phone}
                register={register}
              />
              <FormField
                id="password"
                label={TextData.password}
                type="password"
                register={register}
              />

             <FormField
                id="confirmPassword"
                label={"تاكيد كلمة المرور"}
                type="password"
                register={register}
              /> 





              {/* confirem password */}
              {/* <FormField
                id="confirmPassword"
                label={TextData.confirmPassword}
                type="password"
                register={register}
              /> */}



              <div className="mb-4">
                <label className="block text-gray-700">{TextData.area}</label>
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


              {/* <div className="mb-4">
                <label className="block text-gray-700">{TextData.govern}</label>
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
              </div> */}

              {/* sssssssssssssssssssssssssssssssssssssss */}











            
              {
  selectedItems.length > 0 ?(
  <div className="mb-4">
  <CheckboxList
    text="اختر المحافظات"
    selected={handleGovernorateSelection}
    items={selectedItems}
  />
</div>






) :
<div>
  <h6 className="mt-10  font-semibold text-black">اختيار المحافظات</h6>
    <div className="p-4 bg-red-50 rounded-lg text-center">
  <p className="text-sm text-gray-600">يجب تحديد المنطقة أولًا</p>
  </div>
</div>
}














              {/* <TierSelection
                id="accountType"
                tiers={Tiers}
                register={register}
                // selectedCategory={watch("category")}
                // setValue={setValue}
              /> */}
              <input type="hidden" {...register("accountType")} value="عادي" />
              {/* <FormField id="iban" label={TextData.iban} register={register} /> */}
            </div>

            {/* Social Media Data */}
            <SocialMediaInputs register={register} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                className="mr-2"
                {...register("privacyPolicy")}
              />
              {TextData.privacyPolicy}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-bold"
              >
                {" "}
                {TextData.privacyPolicyLink}
              </a>
            </label>
          </div>



          <div className="w-full mx-auto flex flex-col">
            <button
              type="submit"
              className="w-fit px-20 mx-auto bg-indigo-600 text-white py-2 mt-6 rounded-lg hover:bg-indigo-700"
            >
              {TextData.signUp}
            </button>
          </div>
          <div className="w-full mx-auto flex flex-row justify-center items-center gap-20 p-4">
  {/* Go to Login */}
  <Link
    to="/login"
    className="text-blue-500 hover:text-blue-700 transition font-semibold hover:underline"
    aria-label="الانتقال إلى تسجيل الدخول"
  >
    تسجيل الدخول
  </Link>
  {/* Back to Home */}
  <Link
    to="/"
    className="text-blue-500 hover:text-blue-700 transition font-semibold hover:underline"
    aria-label="العودة إلى الصفحة الرئيسية"
  >
    الصفحة الرئيسية
  </Link>

</div>

        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignUpPage;
