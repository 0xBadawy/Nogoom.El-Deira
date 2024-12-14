import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import CheckboxList from "../../Components/CheckboxList";
import ImageUploader from "../../Components/ImageUploader";
import { storage } from "../../Configuration/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GovernmentData } from "../../Stars/SignUp/data";
import { useDashboard } from "../../Context/DashboardContext";
import CheckboxListName from "../../Components/CheckboxListName";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";

const CreateAd = () => {
  const { allUsers, addADs } = useDashboard();
  const [GovernList, setGovernList] = useState([]);
  const { getUserEmail } = useAuth();
  const [selectGovernorates, setSelectGovernorates] = useState([]);
  const [data, setData] = useState(null);
  const [selectStars, setSelectStars] = useState([]);
  const [starsList, setStarsList] = useState([]);
  const [uploadImageProgress, setuploadImageProgress] = useState(0); // حالة لنسبة الرفع
  const [uploadVideoProgress, setuploadVideoProgress] = useState(0); // حالة لنسبة الرفع

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [imageURL, setImageURL] = useState([]);
  const [videoURL, setVideoURL] = useState("");

  const onSubmit = (data) => {
    const adData = {
      ...data,
      governorates: selectGovernorates,
      stars: selectStars,
      images: imageURL,
      video: videoURL,
      views: 0,
    };
    console.log(adData);
    addADs(adData);
    setImageURL([]);
    setVideoURL("");
    reset();
    toast.success("تم إضافة  حملة بنجاح!");
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

  const handleUpload = (e) => {
    setLoading(true);

    setuploadImageProgress(0); // تحديث الحالة

    const files = e.target.files; // الحصول على قائمة الملفات
    if (!files.length) {
      //  console.error("No files selected");
      return;
    }

    Array.from(files).forEach((file) => {
      let fileName = "noUser";
      const userEmail = getUserEmail();
      if (userEmail) fileName = userEmail;
      const storageRef = ref(storage, `${fileName}/images/${file.name}`); // مرجع لكل ملف
      const uploadTask = uploadBytesResumable(storageRef, file); // بدء رفع الملف

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // تحديث نسبة الرفع
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(
            `Upload progress for ${file.name}: ${progress.toFixed(2)}%`
          );

          setuploadImageProgress(progress); // تحديث الحالة

          switch (snapshot.state) {
            case "paused":
              console.log(`Upload for ${file.name} is paused`);
              break;
            case "running":
              console.log(`Upload for ${file.name} is running`);
              break;
            default:
              break;
          }
        },
        (error) => {
          // التعامل مع الأخطاء أثناء الرفع
          console.error(`Upload failed for ${file.name}:`, error.message);
          switch (error.code) {
            case "storage/unauthorized":
              console.error(
                "User does not have permission to access the object"
              );
              break;
            case "storage/canceled":
              console.error("User canceled the upload");
              break;
            case "storage/unknown":
              console.error("Unknown error occurred", error.serverResponse);
              break;
            default:
              break;
          }
          setLoading(false);
        },
        async () => {
          // عند إكمال الرفع بنجاح
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(`File available at ${downloadURL}`);
            setImageURL((prevState) => [...prevState, downloadURL]);

            // هنا يمكنك تخزين الروابط في مصفوفة أو إضافتها إلى حالة
          } catch (err) {
            console.error("Error getting download URL:", err);
          }

          setLoading(false);
        }
      );
    });
  };

  const handleVideoUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0]; // الحصول على الفيديو
    if (!file) {
      console.error("No video selected");
      return;
    }

    let fileName = "noUser";
    const userEmail = getUserEmail();
    if (userEmail) fileName = userEmail;
    const storageRef = ref(storage, `${fileName}/videos/${file.name}`); // مرجع الفيديو في التخزين
    const uploadTask = uploadBytesResumable(storageRef, file); // بدء رفع الفيديو

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // تحديث نسبة الرفع
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress.toFixed(2)}%`);
        setuploadVideoProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // التعامل مع الأخطاء أثناء الرفع
        console.error("Upload failed:", error.message);
        switch (error.code) {
          case "storage/unauthorized":
            console.error("User does not have permission to access the object");
            break;
          case "storage/canceled":
            console.error("User canceled the upload");
            break;
          case "storage/unknown":
            console.error("Unknown error occurred", error.serverResponse);
            break;
          default:
            break;
        }
        setLoading(false);
      },
      async () => {
        // عند إكمال الرفع بنجاح
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Video available at", downloadURL);
          setVideoURL(downloadURL);
          // يمكنك تخزين الرابط في حالة أو إظهاره في الواجهة
        } catch (err) {
          console.error("Error getting download URL:", err);
        }
        setLoading(false);
      }
    );
  };

  // useEffect(() => {
  //   // console.log(selectGovernorates);
  //   // console.log(selectStars);
  // }, [selectGovernorates, selectStars]);

  return (
    <div className="p-2 md:p-8 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-gray-800  font-bold">
        اضافة حملة جديدة{" "}
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
            <div className="mb-6 md:col-span-2 col-span-6">
              <label
                className="block text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center gap-2"
                htmlFor="images"
              >
                <span className="material-icons"> </span> صور الإعلان
              </label>
              <input
                type="file"
                id="images"
                onChange={handleUpload}
                multiple
                className="w-full p-3 border-2 border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.images.message}
                </p>
              )}
              <div className="relative w-full mt-2 h-2 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div
                  className="absolute top-0 left-0 h-2 rounded-lg bg-blue-500"
                  style={{ width: `${uploadImageProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6 md:col-span-2 col-span-6">
              <label
                className="block text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center gap-2"
                htmlFor="video"
              >
                <span className="material-icons"></span> فيديو الإعلان
              </label>
              <input
                type="file"
                id="video"
                onChange={handleVideoUpload}
                className="w-full p-3 border-2 border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.video && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.video.message}
                </p>
              )}
              <div className="relative w-full mt-2 h-2 bg-gray-200 rounded-lg dark:bg-gray-700">
                <div
                  className="absolute top-0 left-0 h-2 rounded-lg bg-blue-500"
                  style={{ width: `${uploadVideoProgress}%` }}
                ></div>
              </div>
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
        {loading ? (
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
            disabled
          >
            جاري الإضافة...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            إضافة الإعلان
          </button>
        )}
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CreateAd;
