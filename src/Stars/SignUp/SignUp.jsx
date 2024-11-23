import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import FormField from "./FormField";
import SocialMediaInputs from "./SocialMediaInputs";
import TierSelection from "./TierSelection";
import Logo from "../../assets/Images/Logo/Deira-logo2.png";
import { GovernmentData, TextData, Tiers } from "./data";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedGovernment = GovernmentData.find(
      (gov) => gov.name === selectedValue
    );
    setSelectedItems(
      selectedGovernment ? selectedGovernment.subGovernments : []
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    // Your form submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
        <img src={Logo} alt="logo" className="w-10 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-6">
          {TextData.title}
        </h2>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            {/* Main Data Section */}
            <div>
              <FormField
                id="name"
                label={TextData.name}
                register={register}
                errors={errors}
              />
              <FormField
                id="email"
                label={TextData.email}
                type="email"
                register={register}
                errors={errors}
              />
              <FormField
                id="phone"
                label={TextData.phone}
                register={register}
                errors={errors}
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

              <FormField
                id="IBAN"
                label={TextData.iban}
                register={register}
                errors={errors}
              />
              {/* // accept privacy and readit*/}

              <div className="mb-4">
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...register("privacyPolicy", {
                      required: TextData.privacyPolicyError,
                    })}
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
            <SocialMediaInputs register={register} errors={errors} />
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
