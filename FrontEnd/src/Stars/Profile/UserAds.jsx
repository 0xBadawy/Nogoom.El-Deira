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
import { Trash2 } from "lucide-react";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { useDashboard } from "../../Context/DashboardContext";
import { useAuth } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import axiosInstance from "../../Configuration/axiosInstance";
import formatDate from "../../hooks/formatDate";

const UserAds = () => {
  const { user } = useAuth();
  const { UpdateCurrentUserAds, getUserAds } = useDashboard();
  const [Ads, setAds] = useState(null);
  const [userId, setUserId] = useState(null);
  const [AdID, setAdId] = useState(null);
  const { handleSubmit, register, setValue } = useForm();
const [links, setLinks] = useState(["https://example.com", "https://test.com"]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axiosInstance.get(
        `/advertisement/user-ads/${user._id}`
      );
      setAds(response.data.ads);

      console.log(response.data.ads);
    };

    fetchUserData();
  }, [user]);




  const isExpired = (endDate)=>{
    return new Date(endDate) < new Date();
  }


const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log(
    "Saved Links:",
    links.filter((link) => link.trim() !== "")
  );

  const addData = async () => {
    try {
      const response = await axiosInstance.post(
        `/advertisement/edit-links/${AdID.adId._id}/${user._id}`,
        {
          links: links.filter((link) => link.trim() !== ""),
        }
      );

      console.log(response.data);
      toast.success("تم حفظ الروابط بنجاح");
    } catch (error) {
      console.error("Error while saving links:", error);
      toast.error("حدث خطأ أثناء حفظ الروابط");
    }
  };

  addData();
};

const handleInputChange = (index, value) => {
  const updatedLinks = [...links];
  updatedLinks[index] = value;
  setLinks(updatedLinks);
};

const addInputField = () => {
  setLinks([...links, ""]);
};

const handleDeleteInput = (index) => {
  setLinks(links.filter((_, i) => i !== index));
};

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
                    <h4
                      className="text-lg font-semibold text-gray-800 
                    overflow-hidden overflow-ellipsis whitespace-nowrap"
                    >
                      {ad.adId.title}
                    </h4>
                    <div
                      className={`mt-2 px-4 py-1 rounded w-fit text-sm text-white ${
                        isExpired(ad.endDate) ? "bg-red-600" : "bg-green-600"
                      }`}
                    >
                      {isExpired(ad.endDate)
                        ? "الحملة منتهية"
                        : "الحملة مستمرة"}
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {/* {ad?.updatedAt.toDate().toLocaleString()} */}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center gap-1">
                    <Link
                      size="sm"
                      variant="outlined"
                      color="indigo"
                      className="flex items-center bg-indigo-800 text-white px-2 py-2 text-sm rounded-md"
                      to={`/ads/${ad.adId}`}
                      // onClick={() => UpdateCurrentUserAds(ad.id)}
                    >
                      <FaStar className="text-white mr-2" />
                      التفاصيل
                    </Link>
                    <Button
                      size="sm"
                      variant="filled"
                      color="red"
                      className="flex items-center bg-indigo-100"
                      onClick={() => {
                        setAdId(ad);
                        console.log("ad", ad);
                        setLinks(ad.links);
                      }}
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
                {AdID.adId.title}
              </h4>
              <div
                className={`mt-2 px-4 py-1 rounded w-fit text-sm text-white ${
                  isExpired(AdID.adId.endDate) ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {isExpired(AdID.endDate) ? "الحملة منتهية" : "الحملة مستمرة"}
                <span className="text-gray-700 text-sm">
                  {` (${formatDate(AdID.adId.startDate)} - ${formatDate(
                    AdID.adId.endDate
                  )})`}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">{AdID.adId.description}</p>
              </div>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className="space-y-6 mt-10 p-8 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto"
            >
              <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    اضافة روابط المشاركات
              </h2>

              <div className="space-y-4">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 shadow-sm"
                  >
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder={`Link ${index + 1}`}
                      className="flex-1 text-gray-800 border-none bg-transparent outline-none placeholder-gray-400 focus:ring-0 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteInput(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  type="button"
                  onClick={addInputField}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-all"
                >
                  <span>إضافة حقل جديد</span>
                  <span className="text-lg font-bold">+</span>
                </Button>

                <Button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-medium text-sm rounded-lg hover:bg-green-700 transition-all"
                >
                  حفظ التغييرات
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UserAds;
