import React, { useState, useEffect } from "react";
import { Badge } from "@/Components/ui/badge";
import {
  FaStar,
  FaRegStar,
  FaTrash,
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { useDashboard } from "../../Context/DashboardContext";
import { useAuth } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UserAds = () => {
  const { getUserId } = useAuth();
  const { UpdateCurrentUserAds, getUserAds } = useDashboard();
  const [Ads, setAds] = useState(null);
  const [userId, setUserId] = useState(null);
  const [AdID, setAdId] = useState(null);
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const Uid = await getUserId();
        setUserId(Uid);
        console.log("User ID fetched:", Uid);

        if (Uid) {
          const data = await getUserAds(Uid);
          setAds(data);
          console.log("User Ads fetched:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [getUserId]);

  const onSubmit = (data) => {
    console.log(data);
    UpdateCurrentUserAds(userId, { adId: AdID.adId, links: data });
    toast.success("تم حفظ المشاركات بنجاح!");
  };

  useEffect(() => {
    if (AdID) {
      setValue("fb", AdID.links.fb);
      setValue("in", AdID.links.in);
      setValue("sh", AdID.links.sh);
      setValue("tk", AdID.links.tk);
      setValue("x", AdID.links.x);
      setValue("you", AdID.links.you);
    }
  }, [AdID, setValue]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900">
            الحملات الاعلانية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600">
            إدارة تفضيلات للحملات الاعلانية الخاصة بك هنا.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Ads?.length > 0 ? (
              Ads.map((ad, id) => (
                <div
                  key={id}
                  className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {ad.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">
                      {/* {ad?.updatedAt.toDate().toLocaleString()} */}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Button
                      size="sm"
                      variant="outlined"
                      color="indigo"
                      className="flex items-center"
                      // onClick={() => UpdateCurrentUserAds(ad.id)}
                    >
                      <FaStar className="text-indigo-500 mr-2" />
                      تمييز
                    </Button>
                    <Button
                      size="sm"
                      variant="filled"
                      color="red"
                      className="flex items-center"
                      onClick={() => setAdId(ad)}
                    >
                      اضافة مشاركات
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لا توجد حمالات اعلانية حالياً.</p>
            )}
          </div>
        </CardContent>
      </Card>
      {AdID && (
        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-indigo-900">
              تفاصيل الإعلان
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">
                {AdID.title}
              </h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
              <div className="grid md:grid-cols-6 gap-4 grid-cols-3 items-center mb-6">
                {/* Facebook */}
                <div className="mb-4 col-span-3">
                  <label
                    className="text-gray-700 text-sm font-bold mb-2 flex flex-row items-center gap-2"
                    htmlFor="fb"
                  >
                    <FaFacebook size={19} />
                    {"مشاركة الفيس بوك"}
                  </label>
                  <input
                    type="text"
                    id="fb"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("fb")}
                    placeholder="https://facebook.com"
                  />
                </div>

                {/* Instagram */}
                <div className="mb-4 col-span-3">
                  <label
                    className="text-gray-700 text-sm font-bold mb-2 flex flex-row items-center gap-2"
                    htmlFor="in"
                  >
                    <FaInstagram size={19} />
                    {"مشاركة الإنستجرام"}
                  </label>
                  <input
                    type="text"
                    id="in"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("in")}
                    placeholder="https://instagram.com"
                  />
                </div>

                {/* Snapchat */}
                <div className="mb-4 col-span-3">
                  <label
                    className="text-gray-700 text-sm font-bold mb-2 flex flex-row items-center gap-2"
                    htmlFor="sh"
                  >
                    <FaSnapchat size={19} />
                    {"مشاركة سناب شات"}
                  </label>
                  <input
                    type="text"
                    id="sh"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("sh")}
                    placeholder="https://snapchat.com"
                  />
                </div>

                {/* TikTok */}
                <div className="mb-4 col-span-3">
                  <label
                    className="text-gray-700 text-sm font-bold mb-2 flex flex-row items-center gap-2"
                    htmlFor="tk"
                  >
                    <FaTiktok size={19} />
                    {"مشاركة تيك توك"}
                  </label>
                  <input
                    type="text"
                    id="tk"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("tk")}
                    placeholder="https://tiktok.com"
                  />
                </div>

                {/* X */}
                <div className="mb-4 col-span-3">
                  <label
                    className="text-gray-700 text-sm font-bold mb-2 flex flex-row items-center gap-2"
                    htmlFor="x"
                  >
                    <FaTwitter size={19} />
                    {"مشاركة X (تويتر سابقًا)"}
                  </label>
                  <input
                    type="text"
                    id="x"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("x")}
                    placeholder="https://x.com"
                  />
                </div>

                {/* YouTube */}
                <div className="mb-4 col-span-3">
                  <label
                    className="text-gray-700 text-sm font-bold mb-2 flex flex-row items-center gap-2"
                    htmlFor="you"
                  >
                    <FaYoutube size={19} />
                    {"مشاركة يوتيوب"}
                  </label>
                  <input
                    type="text"
                    id="you"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                    {...register("you")}
                    placeholder="https://youtube.com"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                حفظ التغييرات
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UserAds;
