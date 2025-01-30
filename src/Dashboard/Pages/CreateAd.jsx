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
  const [Region, setRegion] = useState();
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

  const [videoURL, setVideoURL] = useState("");
  
  const CheckDateValidation = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return false;
    }
    return true;
  };
  
  
  const [imageURL, setImageURL] = useState([]);
  const onSubmit = (data) => {


    // if (imageURL.length === 0) {
    //   setImageURL([
    //     "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/Website%20Images%2FScreenshot_4.png?alt=media&token=bc03316e-9bfc-47b0-b660-c17e7dc2ca09"
    //   ]);
    // }



    const adData = {
      ...data,
      governorates: selectGovernorates,
      stars: selectStars,
      images: imageURL.length > 0 ? imageURL : [ "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/Website%20Images%2FScreenshot_5.png?alt=media&token=e314b8df-858e-4092-b3fe-920473f514e9"],
      video: videoURL,
      views: 0,
    };
    console.log(adData);

    if (data.startDate && data.endDate) {
      const isValid = CheckDateValidation(data.startDate, data.endDate);
      if (!isValid) {
        toast.error("تاريخ البداية يجب ان يكون قبل تاريخ النهاية");
        return;
      }
    }

    if (selectGovernorates.length === 0) {
      toast.error("يجب اختيار المحافظة");
      return;
    }


    if (selectStars.length === 0) {
      toast.error("يجب اختيار النجوم");
      return;
    }

    



    
      


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

    setSelectStars([]);
    // setSelectGovernorates([]);
    // const stars = allUsers.filter((user) => user.role === "star" &&  user.govern===Region);
    // console.log(stars)
    const stars = allUsers.filter(
  (user) => user.role === "star" && user.area.some(region => selectGovernorates.includes(region))
);


    setStarsList(stars.map((star) => star.name));
    setStarsList(stars.map((star) => ({ name: star.name, Uid: star.Uid })));

  }, [allUsers,Region,selectGovernorates]);

  const HandelRegionChange = (e) => {
    setSelectGovernorates([]);
    setGovernList([]);

    setRegion(e.target.value);
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

    


    const files2 = event.target.files; // Get all the files from the input
    console.log("Files:", files2); // Log all files to inspect them
  
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"];
    
    // Loop through each file to check its type
    for (let i = 0; i < files2.length; i++) {
      const file = files2[i];
      console.log("File type:", file.type); // Log the type of each file
  
      if (!validImageTypes.includes(file.type)) {
        console.log("Invalid file type detected:", file.type); // Log invalid file type
        alert("نوع الصورة غير مدعوم. يرجى رفع ملف بصيغة JPEG أو PNG أو GIF أو BMP أو WEBP."); // رسالة خطأ واضحة
        setLoading(false); // إيقاف حالة التحميل
        return;
      } else {
        console.log("Valid file type:", file.type); // Log valid file type
      }
    }



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

    // validte the type 

    if (!file.type.startsWith("video/")) {
      alert("نوع الملف غير مدعوم. يرجى رفع ملف بصيغة فيديو."); // رسالة خطأ واضحة
      setLoading(false); // إيقاف حالة التحميل
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
            {/* <div className="mb-4 md:col-span-2 col-span-6">
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
            </div> */}

            {/* تاريخ البداية */}
            <div className="mb-4 md:col-span-3 col-span-6">
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
            <div className="mb-4 md:col-span-3 col-span-6">
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

            <div className="mb-8 md:col-span-2 col-span-6">
  <label
    className="block text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3"
    htmlFor="images"
  >
    <span className="material-icons text-blue-600 text-3xl"></span>
    <span className="flex-1">صور الإعلان</span>
  </label>
  <div className="relative group">
    <input
      type="file"
      id="images"
      onChange={handleUpload}
      multiple
      className="hidden"
    />
    <label
      htmlFor="images"
      className="w-full p-4 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-blue-50 dark:bg-gray-800 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all"
    >
      <span className="flex flex-col items-center">
        <span className="material-icons text-blue-400 text-2xl">
        اضغط لتحميل الصور
        </span>
        <p className="mt-2 text-blue-600 dark:text-gray-300"></p>
      </span>
    </label>
  </div>
  {errors.images && (
    <p className="text-red-500 text-sm mt-3">
      {errors.images.message}
    </p>
  )}
  <div className="relative w-full mt-5 h-3 bg-gray-300 rounded-full dark:bg-gray-700 overflow-hidden">
    <div
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-full transition-all"
      style={{ width: `${uploadImageProgress}%` }}
    ></div>
  </div>
  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
   نسبة التحميل: {uploadImageProgress.toFixed(2)}%
  </p>
</div>

<div className="mb-8 md:col-span-2 col-span-6">
  <label
    className="block text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3"
    htmlFor="video"
  >
    <span className="material-icons text-red-600 text-3xl"></span>
    <span className="flex-1">فيديو الإعلان</span>
  </label>
  <div className="relative group">
    <input
      type="file"
      id="video"
      onChange={handleVideoUpload}
      className="hidden"
    />
    <label
      htmlFor="video"
      className="w-full p-4 border-2 border-dashed border-red-400 rounded-lg cursor-pointer bg-red-50 dark:bg-gray-800 dark:border-gray-600 hover:bg-red-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all"
    >
      <span className="flex flex-col items-center">
        <span className="material-icons text-red-400 text-2xl">
        اضغط لتحميل الفيديو
        </span>
        <p className="mt-2 text-red-600 dark:text-gray-300"></p>
      </span>
    </label>
  </div>
  {errors.video && (
    <p className="text-red-500 text-sm mt-3">
      {errors.video.message}
    </p>
  )}
  <div className="relative w-full mt-5 h-3 bg-gray-300 rounded-full dark:bg-gray-700 overflow-hidden">
    <div
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-red-400 to-red-600 rounded-full transition-all"
      style={{ width: `${uploadVideoProgress}%` }}
    ></div>
  </div>
  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
  نسبة التحميل: {uploadVideoProgress.toFixed(2)}%
  </p>
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
                <option value="">اختر المنطقة</option>
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




            
{
  GovernList.length > 0 ?(
  <div className="mb-4">
  <CheckboxList
    text="اختر المحافظات"
    selected={handleGovernorateSelection}
    items={GovernList}
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


{
  starsList.length > 0 ?(
    <div className="mb-4">
    <CheckboxListName
      text="اختر النجوم"
      selected={handleStarSelection}
      items={starsList}
    />
  </div>






) :
<div>
  <h6 className="mt-10 font-semibold text-black">اختيار النجوم</h6>
    <div className="p-4 bg-red-50 rounded-lg text-center">
  <p className="text-sm text-gray-600"> 
  
  {
    GovernList.length <=0? "يجب اختيار المنطقة والمحافظات اولا":"لا يوجد نجوم متاحين فى المحافظات المحددة"
  }
    </p>
  </div>
</div>
}



         

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
