import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { X } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { useAuth } from '../../Context/AuthContext'
import { storage } from "../../Configuration/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'sonner'

export function AdEditModal({ ads, selected, onSave }) {
  const { getUserEmail } = useAuth();

  const [isOpen, setIsOpen] = useState(false)
  const { control, handleSubmit, reset, register } = useForm()

  const [uploadImageProgress, setuploadImageProgress] = useState(0); // حالة لنسبة الرفع
  const [uploadVideoProgress, setuploadVideoProgress] = useState(0); // حالة لنسبة الرفع
  const [loading, setLoading] = useState(false);
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




  const handleUpload = (e) => {




    const files2 = event.target.files;
    console.log("Files:", files2);

    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"];

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

    const validVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/mkv"];
    if (!validVideoTypes.includes(file.type)) {
      // alert("نوع الفيديو غير مدعوم.")
      // console.error("نوع الفيديو غير مدعوم.");
      alert("نوع الفيديو غير مدعوم. يرجى رفع ملف بصيغة MP4 أو WEBM أو OGG أو AVI أو MKV."); // رسالة خطأ واضحة
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



  const [prevImages, setPrevImages] = useState([])
  const [prevVideo, setPrevVideo] = useState("")


  useEffect(() => {
    if (selected) {
      const ad = ads.find(ad => ad.id === selected)
      if (ad) {
        reset(ad)
        setPrevImages(ad.images)
        setPrevVideo(ad.video)
      }
    }
  }, [selected, ads, reset])

  const onSubmit = (data) => {

    // console.log("imageURL" ,imageURL)
    // console.log("prevImages" ,prevImages)
    let img = imageURL.length > 0 ? imageURL : prevImages;
    let vid = videoURL != "" ? videoURL : prevVideo;
    // console.log("imageURL" ,imageURL)
    // console.log("img" ,img)
    const adData = {
      ...data,
      images: img,
      video: vid,
    };

    if (data.startDate && data.endDate) {
      const isValid = CheckDateValidation(data.startDate, data.endDate);
      if (!isValid) {
        toast.error("تاريخ البداية يجب ان يكون قبل تاريخ النهاية");
        return;
      }
    }
    onSave({ ...adData, id: selected })
    setImageURL([]);
    setVideoURL("");
    reset();
    toast.success("تم تعديل  حملة بنجاح!");

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button variant="outline">تعديل الأعلان</Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[80vh] overflow-y-auto focus:outline-none z-50">
        <DialogHeader>
          <DialogTitle className="text-center"> تعديل عنوان ومشاهدات الاعلان </DialogTitle>
          {/* <Button
            variant="ghost"
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button> */}
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="">


          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              العنوان
            </label>
            <input
              type="text"
              id="title"
              className=" border border-blue-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("title")}
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              الوصف
            </label>
            <textarea
              type="text"
              id="description"
              className=" border border-blue-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("description")}
            />
          </div>


          <div className='grid grid-cols-2 gap-2'>


            <div className="mb-4 mt-4">
              <label
                className="block text-gray-800 dark:text-white mb-2 text-sm "
                htmlFor="category"
              >
                اختر نوع الإعلان
              </label>
              <select
                id="category"
                {...register("category")}
                className="w-full p-1 border rounded-lg dark:bg-gray-800 dark:text-white"
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
            </div>


            <div className="flex flex-col space-y-2 mt-4">
              <label htmlFor="views" className="text-sm font-medium text-gray-700">
                المشاهدات
              </label>
              <input
                type="number"
                id="views"
                min={0}
                className=" border border-blue-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("views")}
              />
            </div>




          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label className="text-sm font-medium text-gray-700">الصور الحالية</label>
            <div className="grid grid-cols-3 gap-2">
              {prevImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
            </div>
          </div>



          <div className='grid grid-cols-2 gap-2'>



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

            <hr />

            {/* Video Preview Section */}
            {prevVideo && !videoURL && (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm mb-2">الفيديو الحالي:</label>
                <video src={prevVideo} controls className="w-full max-h-[300px]" />
              </div>
            )}
            {videoURL && (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm mb-2">الفيديو المرفوع:</label>
                <video src={videoURL} controls className="w-full max-h-[300px]" />
              </div>
            )}


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







          <div className='grid grid-cols-4 gap-2'>



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

            </div>



          </div>





























          <button type='submet' className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4"

          >
            حفظ البيانات
          </button>


        </form>



      </DialogContent>
    </Dialog>
  )
}

