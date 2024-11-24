import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import SocialMediaInputs from "./SocialMediaInputs";
import TierSelection from "./TierSelection";
import Logo from "../../assets/Images/Logo/Deira-logo2.png";
import { GovernmentData, TextData, Tiers } from "./data";
import { useAuth } from "../../Context/AuthContext";

const SignUpPage = () => {
  const { signUp } = useAuth();

  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const { register, watch, setValue, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (event) => {
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
    try {
      setError(null);
      setLoading(true);

      // Extract the necessary user data (e.g., name, role) excluding email and password
      const { email, password, ...userData } = data;

      // Call the signUp function
      const result = await signUp(email, password, userData);

      // Check if there was an error during sign-up
      if (!result.success) {
        setError(handleFirebaseError(result.error)); // Set error state
      } else {
        console.log("User successfully signed up and data saved!");
      }
    } catch (error) {
      setError(handleFirebaseError(error.code));
      console.error("Error during submission:", error.message);
    } finally {
      setLoading(false);
    }
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
          <div className="grid grid-cols-2 gap-4">
            {/* Main Data Section */}

            <div>
              <FormField id="name" label={TextData.name} register={register} />
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
              <div className="mb-4">
                <label className="block text-gray-700">{TextData.area}</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
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
              <div className="mb-4">
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
              </div>
              <TierSelection
                tiers={Tiers}
                selectedCategory={watch("category")}
                setValue={setValue}
              />
              <FormField id="iban" label={TextData.iban} register={register} />
              <div className="mb-4">
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...register("privacyPolicy")}
                  />
                  {TextData.privacyPolicy}
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-bold"
                  >
                    {" "}
                    {TextData.privacyPolicyLink}
                  </a>
                </label>
              </div>
            </div>

            {/* Social Media Data */}
            <SocialMediaInputs register={register} />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 mt-6 rounded-lg hover:bg-indigo-700"
          >
            {TextData.signUp}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
