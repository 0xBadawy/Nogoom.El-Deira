import React, { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Download } from "lucide-react"
import { getStorage, ref, getDownloadURL } from "firebase/storage"

interface DownloadButtonProps {
  storagePath: string
  filename: string
  label: string
}

export function DownloadButton({ storagePath, filename, label }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const storage = getStorage()
      const fileRef = ref(storage, storagePath)
      const url = await getDownloadURL(fileRef)

      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Download failed:", error)
      alert("Failed to download the file. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleDownload} variant="outline" className="w-full sm:w-auto" disabled={isLoading}>
      <Download className="mr-2 h-4 w-4" /> {isLoading ? "جاري التحميل..." : label}
    </Button>
  )
}

