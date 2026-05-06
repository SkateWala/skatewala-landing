'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import ImageCarouselModal from './ImageCarouselModal'

interface ProductImage {
  id: number
  image_url: string
  alt_text: string
  is_primary: boolean
  display_order: number
}

interface ProductDetailGalleryProps {
  images: ProductImage[]
  productName: string
  whatsappMessage: string
}

export default function ProductDetailGallery({
  images,
  productName,
  whatsappMessage,
}: ProductDetailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectedImage = images[selectedIndex]

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-secondary rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Main Image with Click to Expand */}
        <div
          className="relative w-full aspect-square bg-secondary rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          {selectedImage && (
            <Image
              src={selectedImage.image_url}
              alt={selectedImage.alt_text}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          )}

          {/* Expand Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground p-4 rounded-full"
              aria-label="Expand image"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-primary text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-primary text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {selectedIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Gallery - 4 Images */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden border-3 transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${
                  idx === selectedIndex
                    ? 'border-primary shadow-lg ring-2 ring-primary/30'
                    : 'border-border hover:border-primary/50'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img.image_url}
                  alt={img.alt_text}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
                {idx === selectedIndex && (
                  <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Image Carousel Modal */}
      <ImageCarouselModal
        isOpen={isModalOpen}
        images={images}
        initialIndex={selectedIndex}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
