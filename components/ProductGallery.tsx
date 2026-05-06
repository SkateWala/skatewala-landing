'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface GalleryImage {
  id: number
  imageUrl: string
  altText?: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  productName: string
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mainImageRef = useRef<HTMLDivElement>(null)
  const selectedImage = images[selectedIndex]

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsZoomed(false)
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !mainImageRef.current) return

    const rect = mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x, y })
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-secondary rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Image with Zoom */}
      <div
        ref={mainImageRef}
        className={`relative w-full aspect-square bg-secondary rounded-xl overflow-hidden group ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        } shadow-lg hover:shadow-xl transition-shadow duration-300`}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
      >
        {selectedImage && (
          <div
            className="relative w-full h-full"
            style={{
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          >
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.altText || productName}
              fill
              className={`object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-[2.5]' : 'scale-100'
              }`}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          </div>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-black/70 hover:bg-primary text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 z-20">
          <ZoomIn size={18} />
          <span className="text-sm font-semibold">{isZoomed ? 'Reset' : 'Zoom'}</span>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-primary text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-primary text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                setSelectedIndex(index)
                setIsZoomed(false)
              }}
              className={`relative aspect-square rounded-lg overflow-hidden border-3 transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${
                index === selectedIndex
                  ? 'border-primary shadow-lg ring-2 ring-primary/30'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || `${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
              {index === selectedIndex && (
                <div className="absolute inset-0 bg-primary/10 rounded-lg" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
