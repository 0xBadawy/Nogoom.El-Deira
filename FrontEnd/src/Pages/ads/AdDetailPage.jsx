import React, { useState, useEffect } from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import { ArrowLeft, Heart, Share2, Eye, Star, Rocket, Globe, Calendar } from "lucide-react"
import { useDashboard } from "../../Context/DashboardContext"
import { motion } from "framer-motion"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Separator } from "@/Components/ui/separator"
import { DownloadButton } from "./DownloadButton"
import { useNavigate } from "react-router-dom";

const AdDetailPage = () => {
  const { id } = useParams()
  const [ad, setAd] = useState(null)
  const [copied, setCopied] = useState(false)
  const { getAdvbyID } = useDashboard()
  const location = useLocation()

  useEffect(() => {
    const fetchAds = async () => {
      const mockData = await getAdvbyID(id)
      console.log(mockData)
      setAd(mockData)
    }
    fetchAds()
  }, [id, getAdvbyID])

  const translations = {
    events: "مناسبات",
    real_estate: "عقارات",
    cars: "سيارات",
    electronics: "إلكترونيات",
    services: "خدمات",
    home_supplies: "لوازم منزلية",
    personal_supplies: "لوازم شخصية",
    animals: "حيوانات",
  }

  const handleShare = async () => {
    const textToCopy = window.location.href

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy text: ", error)
    }
  }

  if (!ad) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-100 to-purple-200">
        <div className="animate-pulse flex gap-4">
          <div className="rounded-full bg-purple-500 h-12 w-12"></div>
          <div className="rounded-full bg-purple-500 h-12 w-12"></div>
          <div className="rounded-full bg-purple-500 h-12 w-12"></div>
        </div>
      </div>
    )
  }

  const isExpired = new Date(ad.endDate) < new Date()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-200 to-purple-300 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="overflow-hidden backdrop-blur-lg bg-white/90 border-2 border-purple-500">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <div className="flex justify-between items-center">
                <Link to="/profile" className="text-white hover:text-purple-200 transition-colors">
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                {/* <Button
      variant="ghost"
      onClick={() => navigate("/profile")} // Navigate to the previous page
      className="text-white hover:text-purple-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      الرجوع
    </Button> */}
              </div>
              <CardTitle className="text-3xl font-bold mt-4 flex items-center">
                <Rocket className="mr-2 h-6 w-6" />
                {ad.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="text-sm">
                  {translations[ad.category]}
                </Badge>
                <Badge variant={isExpired ? "destructive" : "success"} className="text-sm">
                  {isExpired ? "الإعلان منتهي" : "الإعلان مستمر"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {ad.images && (
                    <div className="relative group">
                      <img
                        src={ad.images || "/placeholder.svg"}
                        alt={ad.title}
                        className="w-full rounded-lg shadow-lg transition-transform group-hover:scale-105"
                      />
                      {/* <DownloadButton storagePath={ad.images} filename={`${ad.title}-image.jpg`} label="تحميل الصورة" /> */}
                    </div>
                  )}
                  {ad.video && (
                    <div className="relative group">
                      <video controls className="w-full rounded-lg shadow-lg">
                        <source src={ad.video} type="video/mp4" />
                        متصفحك لا يدعم وسم الفيديو.
                      </video>
                      {/* <DownloadButton storagePath={ad.video} filename={`${ad.title}-video.mp4`} label="تحميل الفيديو" /> */}
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <p className="text-xl">{ad.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                      <div>
                        <strong>تاريخ الإطلاق:</strong>
                        <p>{new Date(ad.startDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                      <div>
                        <strong>تاريخ انتهاء الحدث:</strong>
                        <p>{new Date(ad.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Eye className="mr-2 h-5 w-5 text-purple-600" />
                      <div>
                        <strong>عدد المشاهدات:</strong>
                        <p>{ad.views && ad.views !== 0 ? ad.views.toLocaleString() : "غير متوفر"}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-purple-600" /> المنطقة:
                    </h2>
                    <Badge variant="outline" className="text-lg">
                      {ad.region}
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">المحافظات:</h2>
                    <div className="flex flex-wrap gap-2">
                      {ad?.governorates?.map((region, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {ad.links?.length > 0 && (
                    <div>
                      <Separator />
                      <h2 className="text-xl font-bold mb-2 flex items-center">
                        <Rocket className="mr-2 h-5 w-5 text-purple-600" /> روابط:
                      </h2>
                      <ul className="space-y-2">
                        {ad?.links.map((link, index) => (
                          <li key={index} className="flex items-center gap-2 text-lg">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                            >
                              {link.url.slice(0, 30)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Separator />
                  <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                      <Star className="mr-2 h-5 w-5 text-purple-600" />
                      النجوم المشاركين:
                    </h2>
                    <ul className="list-disc list-inside">
                      {ad.stars?.map((star, index) => (
                        <li key={index}>{star.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AdDetailPage

