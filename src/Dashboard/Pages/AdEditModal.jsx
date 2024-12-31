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
  const { control, handleSubmit, reset } = useForm()

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
        <Button variant="outline">Edit Advertisement</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Advertisement</DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <Input {...field} className="col-span-3" />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{ 
                required: 'Price is required',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Please enter a valid price'
                }
              }}
              render={({ field }) => (
                <Input {...field} type="number" step="0.01" className="col-span-3" />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TV">TV/Monitors</SelectItem>
                    <SelectItem value="PC">PC</SelectItem>
                    <SelectItem value="GA">Gaming/Console</SelectItem>
                    <SelectItem value="PH">Phones</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <Textarea {...field} className="col-span-3" />
              )}
            />
          </div>
          <Button type="submit" className="col-span-4">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

