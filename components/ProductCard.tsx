import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  id: number
  name: string
  slug: string
  price: number
  discountPrice?: number
  badge?: string
  image?: {
    imageUrl: string
    altText?: string
  }
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  discountPrice,
  badge,
  image,
}: ProductCardProps) {
  const savings = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : null

  return (
    <Link href={`/products/${slug}`}>
      <div className="group relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-56 bg-muted overflow-hidden">
          {image?.imageUrl ? (
            <Image
              src={image.imageUrl}
              alt={image.altText || name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {badge}
            </div>
          )}

          {/* Discount Badge */}
          {savings && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              -{savings}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2">
            {name}
          </h3>

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-border">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">
                ₹{discountPrice ? discountPrice.toFixed(2) : price.toFixed(2)}
              </span>
              {discountPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-3 w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold text-sm hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            View
          </button>
        </div>
      </div>
    </Link>
  )
}
