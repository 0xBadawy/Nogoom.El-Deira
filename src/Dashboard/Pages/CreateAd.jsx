import { useEffect, useState } from "react";
import {  useFieldArray, useForm } from "react-hook-form";
import CheckboxList from "../../Components/CheckboxList";
import ImageUploader from "../../Components/ImageUploader";
import { storage } from "../../Configuration/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GovernmentData } from "../../Stars/SignUp/data";
import { useDashboard } from "../../Context/DashboardContext";
import CheckboxListName from "../../Components/CheckboxListName";
import toast, { Toaster } from "react-hot-toast";

const CreateAd = () => {
  const { allUsers, addADs } = useDashboard();
  const [GovernList, setGovernList] = useState([]);
  const [selectGovernorates, setSelectGovernorates] = useState([]);
  const [data, setData] = useState(null);
  const [selectStars, setSelectStars] = useState([]);
  const [starsList, setStarsList] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [imageURL, setImageURL] = useState("");

  const onSubmit = (data) => {
    const adData = {
      ...data,
      governorates: selectGovernorates,
      stars: selectStars,
      images: imageURL,
    };
    console.log(adData);
    addADs(adData);
    reset();
    toast.success("تم إضافة الاعلان بنجاح!");

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

  const handleStarSelection = (item, isSelected) => {
    setSelectStars((prevState) => {
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

  useEffect(() => {
    const stars = allUsers.filter((user) => user.role === "star");
    setStarsList(stars.map((star) => star.name));
    setStarsList(stars.map((star) => ({ name: star.name, Uid: star.Uid })));
  }, [allUsers]);

  useEffect(() => {
    console.log(starsList);
  }, [starsList]);

  const HandelRegionChange = (e) => {
    setSelectGovernorates([]);
    setGovernList([]);
    const fun = () => {
      const region = e.target.value;
      const selectedRegion = GovernmentData.find(
        (item) => item.name === region
      );
      setGovernList(selectedRegion.subGovernments);
    };
    fun();
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links", // اسم الحقل في الفورم
  });

  const UploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, file.name); // إنشاء مرجع للملف
    const uploadTask = uploadBytesResumable(storageRef, file); // رفع الملف
    console.log("uploadTask");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL); // تحديث الرابط في الحالة
        console.log("File available at", downloadURL);
      }
    );
  };

  useEffect(() => {
    console.log(selectGovernorates);
    console.log(selectStars);
  }, [selectGovernorates, selectStars]);

  return (
    <div className="p-2 md:p-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-gray-800  font-bold">
        إضافة إعلان جديد
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-6 gap-3 ">
          <div className="md:col-span-3 col-span-6 grid grid-cols-6 gap-3">
            {/* عنوان الإعلان */}
            <div className="mb-4 col-span-6">
              <label
                className="block text-gray-800 dark:text-white mb-2"
                htmlFor="title"
              >
                عنوان الإعلان
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "عنوان الإعلان مطلوب" })}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* نص الإعلان */}
            <div className="mb-4 col-span-6 ">
              <label
                className="block text-gray-800 dark:text-white mb-2"
                htmlFor="description"
              >
                نص الإعلان
              </label>
              <textarea
                id="description"
                {...register("description", { required: "نص الإعلان مطلوب" })}
                className="w-full h-52 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* اختيار نوع الإعلان */}
            <div className="mb-4 md:col-span-2 col-span-6">
              <label
                className="block text-gray-800 dark:text-white mb-2"
                htmlFor="category"
              >
                اختر نوع الإعلان
              </label>
              <select
                id="category"
                {...register("category", { required: "اختيار النوع مطلوب" })}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="">اختر نوعًا</option>
                <option value="events">مناسبات</option>
                <option value="real_estate">عقارات</option>
                <option value="cars">سيارات</option>
                <option value="electronics">إلكترونيات</option>
                <option value="services">خدمات</option>
                <option value="home_supplies">لوازم منزلية</option>
                <option value="personal_supplies">لوازم شخصية</option>
                <option value="animals">حيوانات</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* تاريخ البداية */}
            <div className="mb-4 md:col-span-2 col-span-6">
              <label
                className="block text-gray-800 dark:text-white mb-2"
                htmlFor="startDate"
              >
                تاريخ البداية
              </label>
              <input
                type="date"
                id="startDate"
                {...register("startDate", { required: "تاريخ البداية مطلوب" })}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* تاريخ النهاية */}
            <div className="mb-4 md:col-span-2 col-span-6">
              <label
                className="block text-gray-800 dark:text-white mb-2"
                htmlFor="endDate"
              >
                تاريخ النهاية
              </label>
              <input
                type="date"
                id="endDate"
                {...register("endDate", { required: "تاريخ النهاية مطلوب" })}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            {/* رفع الصور */}
            <div className="mb-4 md:col-span-2 col-span-6">
              <label
                className="block text-gray-800 dark:text-white mb-2"
                htmlFor="images"
              >
                صور الإعلان
              </label>
              <input
                type="file"
                id="images"
                {...register("images", { required: "رفع الصور مطلوب" })}
                multiple
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2 col-span-6 ">
            {/* اختيار المنطقة */}
            <div className="mb-4">
              <label
                className="block text-gray-800 dark:text-white mb-2"
                htmlFor="region"
              >
                اختر المنطقة
              </label>
              <select
                id="region"
                {...register("region", { required: "اختيار المنطقة مطلوب" })}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                onChange={HandelRegionChange}
              >
                {GovernmentData.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.region.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <CheckboxList
                text="اختر المحافظات"
                selected={handleGovernorateSelection}
                items={GovernList}
              />
            </div>

            <div className="mb-4">
              <CheckboxListName
                text="اختر النجوم"
                selected={handleStarSelection}
                items={starsList}
              />
            </div>

            {/* روابط الإعلان */}
            <div className="mb-4">
              <label
                className="block text-gray-800 dark:text-white mb-2"
                htmlFor="links"
              >
                روابط الإعلان
              </label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                  <input
                    type="url"
                    id={`link-${index}`}
                    {...register(`links.${index}.url`)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                    placeholder={`رابط ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    حذف
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ url: "" })}
                className="p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                إضافة رابط جديد
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          إضافة الإعلان
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CreateAd;
