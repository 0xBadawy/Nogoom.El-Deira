'use client'

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

export function AdEditModal({ ads, selected, onSave }) {
  const [isOpen, setIsOpen] = useState(false)
  const { control, handleSubmit, reset, register } = useForm()

  useEffect(() => {
    if (selected) {
      const ad = ads.find(ad => ad.id === selected)
      if (ad) {
        reset(ad)
      }
    }
  }, [selected, ads, reset])

  const onSubmit = (data) => {
    onSave({ ...data, id: selected })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button variant="outline">تعديل الأعلان</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
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
         
          <button type='submet' className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4"
          
          >
            حفظ البيانات
          </button>


        </form>



      </DialogContent>
    </Dialog>
  )
}

