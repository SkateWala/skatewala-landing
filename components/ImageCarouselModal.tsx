'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductImage {
  id: number
  image_url: string
  alt_text: string
}

interface ImageCarouselModalProps {
  isOpen: boolean
  images: ProductImage[]
  initialIndex: number
  onClose: () => void
}

export default function ImageCarouselModal({
  isOpen,
  images,
  initialIndex,
  onClose,
}: ImageCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      tabIndex={0}
    >
      <div
        className="relative max-w-4xl w-full bg-black rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Main Image */}
        <div className="relative aspect-square bg-black flex items-center justify-center overflow-hidden">
          <Image
            src={currentImage.image_url}
            alt={currentImage.alt_text}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-primary text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-primary text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium z-40">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-0 right-0 flex gap-2 justify-center px-4 pb-4 overflow-x-auto z-40">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === currentIndex
                      ? 'border-primary ring-2 ring-primary/50'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt={img.alt_text}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
