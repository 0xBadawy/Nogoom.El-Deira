import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormField from "./FormField";
import Logo from "../../assets/Images/Logo/Deira-logo2.png";
import { TextData } from "./data";
import { useAuth } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useDashboard } from "../../Context/DashboardContext";
import AreaGovernmentSelector from "../../Components/AreaGovernmentSelector";
import axiosInstance from "../../Configuration/axiosInstance";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Configuration/Firebase";

const SignUpPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { SendSignupNotification } = useDashboard();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaUrl, setMediaUrl] = useState(""); // تغييرها من مصفوفة إلى رابط واحد
  const [address, setAddress] = useState({ area: "", govern: [] });
  const [inputs, setInputs] = useState([{ type: "general", link: "" }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].link = value;
    setInputs(newInputs);
  };

  const addInput = (e) => {
    e.preventDefault();
    if (inputs.length >= 6) {
      toast.error("لا يمكنك إضافة أكثر من 6 روابط.");
      return;
    }

    setInputs([...inputs, { type: "general", link: "" }]);
  };

  const handleSelectionChange = ({ selectedArea, selectedGovernments }) => {
    setAddress((prevAddress) =>
      prevAddress.area !== selectedArea ||
      prevAddress.govern.join(",") !== selectedGovernments.join(",")
        ? { area: selectedArea, govern: selectedGovernments }
        : prevAddress
    );
  };

  const onSubmit = async (data) => {
    if (!data.privacyPolicy) {
      toast.error("يجب الموافقة على سياسة الخصوصية");
      return;
    }

    if (data.password.length < 6) {
      toast.error("كلمة المرور ضعيفة جدًا. يجب أن تحتوي على 6 أحرف على الأقل.");
      return;
    }

    if (data.password.length > 11) {
      toast.error("كلمة المرور. يجب أن تحتوي على 11 حرفًا فقط.");
      return;
    }

    // at least one letter

    if (!/[a-zA-Z]/.test(data.password)) {
      toast.error("كلمة المرور يجب ان تحتوي على حرف واحد على الاقل");
      return;
    }

    if (data.confirmPassword !== data.password) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }

    // if (!/^\d{10,11}$/.test(data.phone)) {
    //   toast.error(
    //     "يجب أن يكون رقم الهاتف مكوناً من 10 أو 11 رقماً ويتكون من أرقام فقط"
    //   );
    //   return;
    // }

    if (!/^\d{8,11}$/.test(data.phone)) {
      toast.error(
        "يجب أن يكون رقم الهاتف مكوناً من 8 إلى 11 رقماً ويتكون من أرقام فقط"
      );
      return;
    }

    if (address.area === "" || address.govern.length === 0) {
      toast.error("يجب اختيار المنطقة والمحافظة");
      return;
    }

    if (inputs.length === 0) {
      toast.error("يجب إضافة رابط واحد على الأقل");
      return;
    }

    if (!mediaUrl) {
      toast.error("يجب اختيار صورة شخصية");
      return;
    }

    const finalData = {
      ...data,
      address,
      social: inputs,
      profileImage: mediaUrl,
    };

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.post("/auth/signup", finalData);
      localStorage.setItem("token", response.data.token);
      signup(response.data.user);
      toast.success(" تم انشاء الحساب بنجاح");
      navigate("/Status");
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message === "UserExists"
            ? "البريد الإلكتروني مستخدم بالفعل"
            : error.response.data.message === "PasswordNotMatch"
            ? "كلمة المرور غير متطابقة"
            : "حدث خطأ أثناء معالجة الطلب، يرجى المحاولة مرة أخرى"
        );
      } else {
        setError("خطأ غير متوقع");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error(`نوع الملف غير مدعوم: ${file.name}`);
      return;
    }

    setLoading(true);

    const fileName = "noUser";
    const storageRef = ref(storage, `${fileName}/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(`خطأ في رفع الملف: ${error.message}`);
        setLoading(false);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setMediaUrl(url);
          console.log("Media URL:", url);
        } catch (error) {
          toast.error(`خطأ في الحصول على رابط الصورة: ${error.message}`);
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className="PatternBG py-10 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
        <img src={Logo} alt="logo" className="w-10 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-6">
          {TextData.title}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">خطأ!</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* -- --- - - - - - - - - - */}
          <div className="mb-4">
            {/* عرض الصورة المختارة */}
            {mediaUrl ? (
              <div className="mt-4 flex justify-center">
                <img
                  src={mediaUrl}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-full "
                  // onClick={() => setMediaUrl("")}
                />
              </div>
            ) : (
              <div className="mt-1 flex  justify-center px- pt-5 pb-6 border-2 border-gray-300 border-dashed mx-auto w-48 h-48 object-cover rounded-full">
                <div className="space-y-1 text-center mt-12 ">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-xs bg-white py-2 px -4  border border-gray-300 rounded-md shadow-sm   font-medium text-gray-700 hover:bg-gray-50"
                  >
                    اختر صورة شخصية او صورة حسابك
                  </label>
                  <p className="text-xs text-gray-500 pt-4">
                    PNG, JPG, GIF حتى 10MB
                  </p>
                </div>
              </div>
            )}

            {/* شريط تقدم التحميل */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* -- --- - - - - - - - - - */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormField
                id="name"
                label={"أسم الشهرة او الحساب*"}
                register={register}
              />
              <FormField
                id="email"
                label={TextData.email}
                type="email"
                register={register}
              />
              {/* <FormField
                id="userName"
                label="اسم المستخدم*"
                type="text"
                register={register}
              /> */}
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
                label="تأكيد كلمة المرور"
                type="password"
                register={register}
              />
            </div>

            <AreaGovernmentSelector onSelectionChange={handleSelectionChange} />

            <div className="w-full mx-auto">
              <label className="block text-gray-700">
                روابط التواصل الاجتماعي
              </label>
              {inputs.map((input, index) => (
                <input
                  key={index}
                  type="url"
                  value={input.link}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="block w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder={`الرابط رقم ${index + 1}`}
                />
              ))}

              <button
                className="mt-2 bg-blue-500 text-white p-2 rounded-md"
                onClick={addInput}
              >
                اضف رابط اخر +
              </button>
            </div>
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
                {TextData.privacyPolicyLink}
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-fit px-20 mx-auto bg-indigo-600 text-white py-2 mt-6 rounded-lg"
          >
            {TextData.signUp}
          </button>

          <div className="flex justify-center gap-20 p-4">
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/"
              className="text-blue-500 font-semibold hover:underline"
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
