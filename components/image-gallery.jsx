"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function ImageGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const openImage = (image) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden" // 스크롤 방지
  }

  const closeImage = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto" // 스크롤 복원
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 active:scale-95"
            onClick={() => openImage(image)}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt || `Gallery image ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* 확대된 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 animate-fade-in"
          onClick={closeImage}
        >
          <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-transform hover:scale-110 active:scale-90">
            <X className="h-6 w-6" />
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw] animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt || "Enlarged image"}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
            {selectedImage.caption && <p className="mt-2 text-center text-white">{selectedImage.caption}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
